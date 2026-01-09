import { AES, lib } from 'crypto-js';
import { PARSED_VERSION } from 'utils/constants';
import { FILE_FORMAT, IV_SIZE, KEY_SIZE, SALT_SIZE } from './constants';
import { disassemble, readAsUint8Array } from './utils';
import {
    buildFile,
    calcHMAC,
    checkBack,
    decryptData,
    decryptFile,
    encryptFile,
    generateIV,
    generateSalt,
    getKey,
    parseFile
} from './core';

describe('generateSalt', () => {
    it('Should generate a salt with a length of SALT_SIZE', () => {
        const salt = generateSalt();
        expect(salt.words.length).toEqual(SALT_SIZE / 4);
    });

    it('Should generate different salts on each call', () => {
        const salt1 = generateSalt();
        const salt2 = generateSalt();
        expect(salt1.toString()).not.toEqual(salt2.toString());
    });
});

describe('generateIV', () => {
    it('Should generate an IV with a length of IV_SIZE', () => {
        const iv = generateIV();
        expect(iv.words.length).toEqual(IV_SIZE / 4);
    });

    it('Should generate different IVs on each call', () => {
        const iv1 = generateIV();
        const iv2 = generateIV();
        expect(iv1.toString()).not.toEqual(iv2.toString());
    });
});

describe('getKey', () => {
    it('Should return a key with with a length of KEY_SIZE', () => {
        const key = getKey('test', generateSalt());
        expect(key.words.length).toEqual(KEY_SIZE);
    });

    it('Should return different keys for different passwords', () => {
        const key1 = getKey('test1', generateSalt());
        const key2 = getKey('test2', generateSalt());
        expect(key1.toString()).not.toEqual(key2.toString());
    });
});

describe('calcHMAC', () => {
    it('Should return the same HMAC for the same data, iv, key and salt', () => {
        const data = lib.CipherParams.create({
            ciphertext: lib.WordArray.random(16)
        });
        const key = getKey('test', generateSalt());
        const iv = generateIV();
        const hmac1 = calcHMAC(data, iv, key);
        const hmac2 = calcHMAC(data, iv, key);
        expect(hmac1.toString()).toEqual(hmac2.toString());
    });
});

describe('buildFile', () => {
    it('Should return a Uint8Array with the correct format', () => {
        const salt = generateSalt();
        const iv = generateIV();
        const key = getKey('test', salt);
        const data = lib.WordArray.random(16);
        const cipher = AES.encrypt(data, key, { iv });
        const hmac = calcHMAC(cipher, iv, key);
        const disguise = new Uint8Array([1, 2, 3, 4]);

        const result = buildFile({
            salt,
            hmac,
            iv,
            cipher,
            disguise
        });

        const { formattedData: [ciphertext, ivResult, hmacResult, saltResult, version] } = disassemble(FILE_FORMAT, result, true);

        expect(ciphertext.toString()).toEqual(cipher.ciphertext.toString());
        expect(ivResult.toString()).toEqual(iv.toString());
        expect(hmacResult.toString()).toEqual(hmac.toString());
        expect(saltResult.toString()).toEqual(salt.toString());
        expect(version).toEqual(new Uint8Array(PARSED_VERSION));
    });

    it('Should throw an error if the file cannot be built correctly', () => {
        const salt = generateSalt();
        const iv = generateIV();
        const key = getKey('test', salt);
        const data = lib.WordArray.random(16);
        const cipher = AES.encrypt(data, key, { iv });
        const hmac = calcHMAC(cipher, iv, key);
        expect(() => buildFile({
            // Passing null to trigger an error
            salt: null as unknown as lib.WordArray,
            hmac,
            iv,
            cipher,
        })).toThrow();
    });
});

describe('checkBack', () => {
    it('Should return true if the decrypted data matches the original data', async () => {
        const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
        const disguise = new File(['iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='], 'test.png', { type: 'image/png' });
        const password = 'testPassword';

        const encrypted = await encryptFile(file, password, disguise);
        const result = await checkBack(await readAsUint8Array(file), encrypted, password);

        expect(result).toBe(true);
    });

    it('Should return false if the decrypted data does not match the original data', async () => {
        const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
        const differentFile = new File(['Different Content'], 'different.txt', { type: 'text/plain' });
        const password = 'testPassword';

        const encrypted = await encryptFile(differentFile, password);
        const result = await checkBack(await readAsUint8Array(file), encrypted, password);

        expect(result).toBe(false);
    });
});

describe('encryptFile', () => {
    it('Should return an encrypted Uint8Array with the correct format', async () => {
        const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
        const password = 'testPassword';
        const disguise = new File(['iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='], 'test.png', { type: 'image/png' });

        const encrypted = await encryptFile(file, password, disguise);
        const { formattedData: [ciphertext, iv, hmac, salt, version] } = disassemble(FILE_FORMAT, encrypted, true);

        expect(ciphertext).toBeTruthy();
        expect(iv).toBeTruthy();
        expect(hmac).toBeTruthy();
        expect(salt).toBeTruthy();
        expect(version).toEqual(new Uint8Array(PARSED_VERSION));
    });

    it('Should throw an error if the file is empty', async () => {
        const file = new File([], 'test.txt', { type: 'text/plain' });
        const password = 'testPassword';
        await expect(encryptFile(file, password)).rejects.toThrow();
    });
});

describe('decryptData', () => {
    it('Should return the decrypted Uint8Array', async () => {
        const extension = 'txt';
        const file = new File(['Hello World'], 'test.' + extension, { type: 'text/plain' });
        const password = 'testPassword';

        const encrypted = await encryptFile(file, password);
        const decrypted = await decryptData(encrypted, password);

        const arr = await readAsUint8Array(file);
        expect(decrypted.data).toEqual(arr);
        expect(decrypted.extension).toEqual(extension);
    });

    it('Should throw an error if the data is empty', async () => {
        const arr = new Uint8Array();
        const password = 'testPassword';
        await expect(decryptData(arr, password)).rejects.toThrow();
    });
});

describe('decryptFile', () => {
    it('Should return the decrypted Uint8Array', async () => {
        const extension = 'txt';
        const file = new File(['Hello World'], 'test.' + extension, { type: 'text/plain' });
        const disguise = new File(['iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='], 'test.png', { type: 'image/png' });
        const password = 'testPassword';

        const encrypted = new File([await encryptFile(file, password, disguise)], 'test.txt', { type: 'text/plain' });
        const decrypted = await decryptFile(encrypted, password);

        const arr = await readAsUint8Array(file);
        expect(decrypted.data).toEqual(arr);
        expect(decrypted.extension).toEqual(extension);
    });

    it('Should throw an error if the file is empty', async () => {
        const file = new File([], 'test.txt', { type: 'text/plain' });
        const password = 'testPassword';
        await expect(decryptFile(file, password)).rejects.toThrow();
    });
});

describe('parse', () => {
    it('Should return a promise that resolves to an object containing the key, hmac, iv and cipher', async () => {
        const file = new File(['Hello World'], 'test.txt', { type: 'text/plain' });
        const password = 'testPassword';

        const encrypted = await encryptFile(file, password);
        const { key, hmac, iv, cipher } = await parseFile(encrypted, password);

        expect(key).toHaveProperty('words');
        expect(hmac).toHaveProperty('words');
        expect(iv).toHaveProperty('words');
        expect(cipher).toHaveProperty('ciphertext');
    });

    it('Should throw an error if the data is empty', async () => {
        const arr = new Uint8Array(0);
        const password = 'testPassword';
        await expect(parseFile(arr, password)).rejects.toThrow();
    });
});

describe('encrypt/decrypt', () => {
    it('Should successfully encrypt and decrypt various file types', async () => {
        const fileTypes = [
            { content: 'Hello World', name: 'text.txt', type: 'text/plain', extension: 'txt' },
            { content: '<html><body>Hello World</body></html>', name: 'index.html', type: 'text/html', extension: 'html' },
            { content: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=', name: 'image.png', type: 'image/png', extension: 'png', isBase64: true },
            // TODO: Add more file types
        ];
        const disguise = new File(['iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='], 'test.png', { type: 'image/png' });
        const password = 'testPassword';

        for (const fileType of fileTypes) {
            const fileContent = fileType.isBase64 ? Uint8Array.from(atob(fileType.content), c => c.charCodeAt(0)) : fileType.content;
            const file = new File([fileContent], fileType.name, { type: fileType.type });

            const encrypted = await encryptFile(file, password, disguise);
            const decrypted = await decryptFile(new File([encrypted], fileType.name, { type: fileType.type }), password);

            const expectedContent = fileType.isBase64
                ? fileContent as Uint8Array
                : new Uint8Array((fileContent as string).split('').map(char => char.charCodeAt(0)));
            expect(decrypted.data).toEqual(expectedContent);
            expect(decrypted.extension).toEqual(fileType.extension);
        }
    });
});
