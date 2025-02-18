'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import DialogModal from '@/components/elems/MainButton/DialogModal/DialogModal.component';
import styles from '@/components/elems/MainButton/MainButton.module.scss';
import { MainButtonPropsIF } from '@/components/elems/MainButton/MainButton.types';

const MainButton: FC<MainButtonPropsIF> = ({
    children,
    href,
    disabled,
    clickHandler,
    className = '',
    type = 'button',
    variant = '',
    htmlFor,
    icon,
    dialogText,
}) => {
    const [isDialogModalOpen, setIsDialogModalOpen] = useState<boolean>(false);
    //TODO сдклвть модалку
    const onClick = () => {
        if (dialogText) {
            setIsDialogModalOpen(true);
            return;
        }
        clickHandler?.();
    };

    const commonProps = {
        disabled,
        onClick,
        className: `flc ${styles.button} ${styles[variant]} ${className}`,
    };

    if (href) {
        return (
            <Link {...commonProps} href={href}>
                {icon && <span className={`flc ${styles.icon}`}>{icon}</span>}
                {children}
            </Link>
        );
    }

    if (htmlFor) {
        return (
            <label {...commonProps} htmlFor={htmlFor}>
                {icon && <span className={`flc ${styles.icon}`}>{icon}</span>}
                {children}
            </label>
        );
    }

    return (
        <button {...commonProps} type={type}>
            {dialogText && clickHandler ? (
                <DialogModal
                    dialogText={dialogText}
                    clickHandler={clickHandler}
                    open={isDialogModalOpen}
                />
            ) : null}
            {icon && <span className={`flc ${styles.icon}`}>{icon}</span>}
            {children}
        </button>
    );
};

export default MainButton;
