import { memo, ReactNode } from 'react';
import SvgIcon from '@mui/material/SvgIcon';

/**
 * The properties for the notice window.
 */
export interface IProps {
    title: string;
    message?: string | ReactNode;
    Icon?: typeof SvgIcon;
}

/**
 * Notice window for displaying messages.
 * @param props The properties for the notice component.
 * @returns The notice component.
 */
export const Notice = (props: IProps) => (
    <div className="notice">
        <div className="notice__content">
            {props.Icon && <props.Icon fontSize="large" />}
            <div className="notice__content-title">{props.title}</div>
            {props.message && <div>{props.message}</div>}
        </div>
    </div>
);

Notice.displayName = 'Notice';

export default memo(Notice);
