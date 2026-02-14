import { useCallback, useState, useContext, ChangeEvent, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CachedIcon from '@mui/icons-material/Cached';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloseIcon from '@mui/icons-material/Close';
import { Action, ValidationResult } from 'utils/types';
import {
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
    MAX_ALERT_FILENAME_LENGTH,
    MAX_FILES_SIZE_MB,
    STAGE_DATA,
    STAGE,
    FILE_EXTENSION,
    APP_NAME,
} from 'utils/constants';
import {
    addExtension,
    changeExtension,
    ellipse,
    joinWithAnd,
    upload,
    validateDisguise,
    validateFile,
    waitReject,
    waitResolve,
} from 'utils/common';
import { deserializeUint8Array, serializeFile } from 'utils/workers';
import type { IRestored } from 'utils/crypto/types';
import { ModerationService, ModerationSlot, ModerationResult } from 'services/moderation';
import { CryptoRequest, CryptoResponse } from 'workers/crypto/types';
import { useSnackbar } from 'components/Snackbar';
import { WindowManagerContext, WINDOW } from 'components/WindowManager';
import DisguiseIcon from 'components/icons/DisguiseIcon';
import Loading from 'windows/Loading';

/**
 * Security settings page.
 * @returns The page for setting up password, disguising, etc.
 */
const Secure = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const windowContext = useContext(WindowManagerContext);

    const moderationServiceRef = useRef<ModerationService | null>(null);

    const [password, setPassword] = useState<string | null>(null);
    const [passwordIsVisible, setPasswordIsVisible] = useState<boolean>(false);

    const handleUploadFileClick = useCallback(async () => {
        try {
            const file = await upload();
            const validation = validateFile(file);
            if (validation !== true) {
                enqueueSnackbar({
                    variant: 'warning',
                    title: 'Unable to upload file',
                    message: (
                        <>
                            <strong>{ellipse(file.name, MAX_ALERT_FILENAME_LENGTH)}</strong>{' '}
                            isn&apos;t uploaded. {validation}
                        </>
                    ),
                });
                return;
            }
            navigate(STAGE_DATA[STAGE.SECURE].path, { state: { ...location.state, file } });
        } catch (error) {
            enqueueSnackbar({
                variant: 'error',
                title: 'Failed to upload file',
                message: 'Something went wrong. Please try again.',
            });
            console.error(error);
        }
    }, [location, enqueueSnackbar]);

    const handleUploadDisguiseClick = useCallback(async () => {
        try {
            const disguise = await upload();
            const validation = validateDisguise(disguise, location.state.file);
            if (validation !== true) {
                enqueueSnackbar({
                    variant: 'warning',
                    title: 'Unable to upload disguise',
                    message: (
                        <>
                            <strong>{ellipse(disguise.name, MAX_ALERT_FILENAME_LENGTH)}</strong>{' '}
                            isn&apos;t uploaded as disguise. {validation}
                        </>
                    ),
                });
                return;
            }
            navigate(STAGE_DATA[STAGE.SECURE].path, {
                state: { ...location.state, disguise },
            });
        } catch (error) {
            enqueueSnackbar({
                variant: 'error',
                title: 'Failed to upload disguise',
                message: 'Something went wrong. Please try again.',
            });
            console.error(error);
        }
    }, [location, enqueueSnackbar]);

    const handleRemoveDisguiseClick = useCallback(async () => {
        const { disguise: _, ...explicitState } = location.state;
        navigate(STAGE_DATA[STAGE.SECURE].path, { state: explicitState });
    }, [location]);

    const handlePasswordChanged = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleTogglePassword = useCallback(() => {
        setPasswordIsVisible((isVisible) => !isVisible);
    }, []);

    const handleClickTermsOfUse = useCallback(() => {
        windowContext.open(WINDOW.TERMS_OF_USE);
    }, [windowContext.open]);

    const handleClickPrivacyPolicy = useCallback(() => {
        windowContext.open(WINDOW.PRIVACY_POLICY);
    }, [windowContext.open]);

    const handleCode = useCallback(
        async (action: Action) => {
            const passwordValidation = validatePassword(password);
            if (passwordValidation !== true) {
                enqueueSnackbar({
                    variant: 'warning',
                    title: `Unable to ${action} file`,
                    message: passwordValidation,
                });
                return;
            }

            windowContext.open(<Loading title="File processing, please wait..." />, {
                modal: true,
                closable: false,
            });
            const file = location.state.file;
            const disguise = location.state.disguise;
            try {
                const results = await Promise.allSettled([
                    // TODO: Check moderation service state and init it if needed
                    process(moderationServiceRef.current, action, file, password!, disguise),
                    // Give the user some time to think about the universe
                    waitResolve(1_000),
                ]);

                if (results[0].status === 'rejected') {
                    throw results[0].reason;
                }

                const value = results[0].value;
                if (!value.ok) {
                    const failed = joinWithAnd(value.failed);
                    const str = value.failed.length
                        ? value.failed.length > 1
                            ? `${failed} files`
                            : `${failed} file`
                        : 'files';
                    enqueueSnackbar({
                        variant: 'warning',
                        title: `Unable to ${action} file`,
                        message: `Uploaded ${str} must not contain inappropriate content.`,
                    });
                    return;
                }

                const result = value.result;
                const fileName =
                    'data' in result
                        ? result.name
                            ? addExtension(result.name, result.extension)
                            : changeExtension(file.name, result.extension)
                        : disguise
                          ? disguise.name
                          : changeExtension(file.name, FILE_EXTENSION);
                const data = 'data' in result ? result.data : result;
                const blob = new Blob([data]);

                const blobValidation = validateBlob(action, blob);
                if (blobValidation !== true) {
                    enqueueSnackbar({
                        variant: 'warning',
                        title: `Unable to ${action} file`,
                        message: blobValidation,
                    });
                    return;
                }

                navigate(STAGE_DATA[STAGE.DOWNLOAD].path, {
                    state: {
                        fileName,
                        data: blob,
                        action,
                    },
                });
            } catch (error) {
                enqueueSnackbar({
                    variant: 'error',
                    message:
                        action === 'encode'
                            ? 'Check if the file is damaged or replace it with another one.'
                            : 'Check that the password or key is correct and make sure the file is not damaged.',
                    title: `Failed to ${action} file`,
                });
                console.error(error);
            } finally {
                windowContext.close();
            }
        },
        [location, enqueueSnackbar, windowContext.open, windowContext.close, password]
    );

    const handleEncodeClick = useCallback(() => handleCode('encode'), [handleCode]);

    const handleDecodeClick = useCallback(() => handleCode('decode'), [handleCode]);

    useEffect(() => {
        return () => {
            moderationServiceRef.current?.dispose();
            moderationServiceRef.current = null;
        };
    }, []);

    useEffect(() => {
        const file = location.state.file;
        if (file.type.startsWith('image/')) {
            moderationServiceRef.current ??= new ModerationService();
            moderationServiceRef.current.start('source', file);
        }
    }, [location.state.file]);

    useEffect(() => {
        const disguise = location.state.disguise;
        if (disguise) {
            if (disguise.type.startsWith('image/')) {
                moderationServiceRef.current ??= new ModerationService();
                moderationServiceRef.current.start('disguise', disguise);
            }
        } else {
            moderationServiceRef.current?.abort('disguise');
        }
    }, [location.state.disguise]);

    if (!location.state) {
        return (
            <Navigate
                to={{
                    pathname: STAGE_DATA[STAGE.UPLOAD].path,
                    search: location.search,
                }}
                replace
            />
        );
    }

    return (
        <>
            <Helmet>
                <title>Secure | {APP_NAME}</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="secure">
                <div className="secure__inputs">
                    <Input
                        value={location.state.file.name}
                        title={location.state.file.name}
                        inputProps={{ tabIndex: -1 }}
                        readOnly
                        endAdornment={
                            <InputAdornment position="end">
                                {!location.state.disguise && (
                                    <IconButton
                                        size="small"
                                        title="Disguise as another file"
                                        aria-label="Disguise as another file"
                                        onClick={handleUploadDisguiseClick}
                                    >
                                        {/* Put emphasis on it */}
                                        <DisguiseIcon fontSize="medium" />
                                    </IconButton>
                                )}
                                <IconButton
                                    size="small"
                                    title="Change the file"
                                    aria-label="Change file"
                                    onClick={handleUploadFileClick}
                                >
                                    <CachedIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {location.state.disguise && (
                        <div className="secure__inputs-disguise">
                            <div className="secure__inputs-disguise-title">Disguise as</div>
                            <Input
                                className="secure__inputs-disguise-input"
                                value={location.state.disguise.name}
                                title={location.state.disguise.name}
                                inputProps={{ tabIndex: -1 }}
                                readOnly
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            title="Change the disguise"
                                            aria-label="Change the disguise"
                                            onClick={handleUploadDisguiseClick}
                                        >
                                            <CachedIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            title="Remove the disguise"
                                            aria-label="Remove the disguise"
                                            onClick={handleRemoveDisguiseClick}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                    )}
                    <Input
                        type={passwordIsVisible ? 'text' : 'password'}
                        placeholder="Enter the password"
                        value={password}
                        autoFocus
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    title={passwordIsVisible ? 'Hide password' : 'Show password'}
                                    aria-label={
                                        passwordIsVisible ? 'Hide password' : 'Show password'
                                    }
                                    onClick={handleTogglePassword}
                                >
                                    {passwordIsVisible ? (
                                        <VisibilityOffIcon fontSize="small" />
                                    ) : (
                                        <VisibilityIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        onChange={handlePasswordChanged}
                    />
                </div>
                <div className="secure__agreement">
                    <span>By continuing, you agree to the </span>
                    {/* Avoid word wrap on narrow screens */}
                    <Link component={'button'} onClick={handleClickTermsOfUse}>
                        terms of use
                    </Link>
                    <span> and the </span>
                    <Link component={'button'} onClick={handleClickPrivacyPolicy}>
                        privacy policy
                    </Link>
                    <span>.</span>
                </div>
                {/* TODO: Add hints for empty password */}
                <div className="secure__actions">
                    <Button variant="contained" disabled={!password} onClick={handleEncodeClick}>
                        Encode
                    </Button>
                    {!location.state.disguise && (
                        <Button variant="outlined" disabled={!password} onClick={handleDecodeClick}>
                            Decode
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

function validatePassword(password: string | null): ValidationResult {
    if (!password) {
        return 'The password is empty.';
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        return `Password must contain at least ${MIN_PASSWORD_LENGTH} characters.`;
    }

    if (password.length > MAX_PASSWORD_LENGTH) {
        return `Password must contain no more than ${MAX_PASSWORD_LENGTH} characters.`;
    }

    return true;
}

function validateBlob(action: Action, blob: Blob): ValidationResult {
    if (action === 'encode' && blob.size > MAX_FILES_SIZE_MB * 1024 * 1024) {
        return `The encoded file size exceeds the maximum allowed size of ${MAX_FILES_SIZE_MB}MB.`;
    }

    return true;
}

async function process(
    // TODO: Make moderationService a required parameter
    service: ModerationService | null,
    action: Action,
    source: File,
    password: string,
    disguise?: File
): Promise<{ ok: true; result: Uint8Array | IRestored } | { ok: false; failed: ModerationSlot[] }> {
    if (action === 'encode' && service) {
        // To ensure stable UX, we do not temporarily interrupt processing
        // if the moderation process ends with an error
        const moderation = await moderate(service, !!disguise).catch(() => true as const);
        if (Array.isArray(moderation)) {
            return { ok: false, failed: moderation };
        }
    }

    const result = await Promise.race([
        crypt(action, source, password, disguise),
        waitReject(30_000),
    ]);

    return { ok: true, result };
}

async function moderate(
    service: ModerationService,
    disguise?: boolean
): Promise<true | ModerationSlot[]> {
    const result = await Promise.race([
        service.wait(disguise ? ['source', 'disguise'] : ['source']),
        waitResolve(60_000),
    ]);

    if (!result) {
        throw new Error('Moderation error');
    }

    const results = 'state' in result ? { source: result } : result;
    const entries = Object.entries(results) as [ModerationSlot, ModerationResult][];

    const failed: ModerationSlot[] = [];

    // TODO: Handle multiple errors
    for (const [slot, entry] of entries) {
        switch (entry.state) {
            case 'error':
                throw new Error(`Moderation error for slot "${slot}": ${entry.error}`);
            case 'aborted':
                throw new Error(`Moderation for slot "${slot}" was aborted`);
            case 'unsafe':
                failed.push(slot);
                break;
        }
    }

    return failed.length ? failed : true;
}

async function crypt(
    action: Action,
    source: File,
    password: string,
    disguise?: File
): Promise<Uint8Array | IRestored> {
    const serializedSource = await serializeFile(source);
    const serializedDisguise = disguise ? await serializeFile(disguise) : undefined;

    return new Promise((resolve, reject) => {
        const worker = new Worker(new URL('workers/crypto', import.meta.url));

        worker.onmessage = (event: MessageEvent<CryptoResponse>) => {
            const data = event.data;

            if ('result' in data) {
                const result = data.result;
                const value =
                    'buffer' in result
                        ? deserializeUint8Array(result)
                        : {
                              name: result.name,
                              extension: result.extension,
                              data: deserializeUint8Array(result.data),
                          };
                resolve(value);
            } else {
                reject(new Error(data?.error ?? 'Worker error'));
            }

            worker.terminate();
        };

        const handleWorkerError = (event: ErrorEvent | MessageEvent) => {
            const error =
                event instanceof ErrorEvent
                    ? event.error || new Error(event.message || 'Crypto worker subscription error')
                    : new Error('Crypto worker subscription message error');

            reject(error);
            worker.terminate();
        };

        worker.onerror = handleWorkerError;
        worker.onmessageerror = handleWorkerError;

        const message: CryptoRequest = {
            action,
            source: serializedSource,
            password,
            disguise: serializedDisguise,
        };

        // To avoid copying, the contents of the files are stored in a transferable object
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
        const transfer = [
            serializedSource.buffer,
            ...(serializedDisguise ? [serializedDisguise.buffer] : []),
        ];

        worker.postMessage(message, transfer);
    });
}

Secure.displayName = 'Secure';

export default Secure;
