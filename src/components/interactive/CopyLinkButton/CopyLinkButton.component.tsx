'use client';

import { FC } from 'react';
import { IoLinkOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/interactive/CopyLinkButton/CopyLinkButton.module.scss';
import { CopyLinkButtonPropsIF } from '@/components/interactive/CopyLinkButton/CopyLinkButton.types';

const CopyLinkButton: FC<CopyLinkButtonPropsIF> = ({
    url,
    className = '',
    dataTest,
    size = 'default',
}) => {
    const handleCopyLink = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(url || window.location.href);
            toast.success(SUCCESS_CODES.s107);
        } catch {
            toast.error(ERRORS_CODES.er900);
        }
    };

    return (
        <Button
            isCustom
            className={`flc ${styles.copyLinkButton} ${styles[size]} ${className}`}
            clickHandler={handleCopyLink}
            aria-label="Скопировать ссылку"
            dataTest={dataTest}
        >
            <IoLinkOutline aria-hidden="true" />
        </Button>
    );
};

export default CopyLinkButton;
