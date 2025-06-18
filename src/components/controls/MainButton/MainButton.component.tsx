'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import styles from '@/components/controls/MainButton/MainButton.module.scss';
import { MainButtonPropsIF } from '@/components/controls/MainButton/MainButton.types';
import DialogModal from '@/components/interactive/DialogModal/DialogModal.component';

const MainButton: FC<MainButtonPropsIF> = ({
    children,
    href,
    disabled,
    clickHandler,
    className = '',
    type = 'button',
    variant = 'primary',
    htmlFor,
    icon,
    isLoading,
    isCustom,
    dialogText,
}) => {
    const [isDialogModalOpen, setIsDialogModalOpen] = useState<boolean>(false);

    const onClick = () => {
        if (dialogText) {
            setIsDialogModalOpen(true);
            return;
        }
        clickHandler?.();
    };

    const commonProps = {
        disabled: disabled || isLoading,
        onClick,
        className: isCustom
            ? `${className}`
            : `flc ${styles.button} ${styles[variant]} ${className} ${isLoading ? styles.loading : ''}`,
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
        <>
            <button {...commonProps} type={type}>
                {isLoading && ['primary', 'secondary'].includes(variant) && (
                    <span className={styles.spinnerWrapper}>
                        <span className="spinner"></span>
                    </span>
                )}
                {icon && !isLoading && variant !== 'link' && (
                    <span className={`flc ${styles.icon}`}>{icon}</span>
                )}
                {children}
            </button>
            {dialogText && clickHandler ? (
                <DialogModal
                    dialogText={dialogText}
                    clickHandler={clickHandler}
                    isOpen={isDialogModalOpen}
                    setIsOpen={setIsDialogModalOpen}
                />
            ) : null}
        </>
    );
};

export default MainButton;
