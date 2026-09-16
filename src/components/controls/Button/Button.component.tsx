'use client';

import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/controls/Button/Button.module.scss';
import { ButtonPropsIF } from '@/components/controls/Button/Button.types';

const Button: FC<ButtonPropsIF> = ({
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
    dataTest,
    style,
    ...restProps
}) => {
    const commonProps = {
        disabled: disabled || isLoading,
        'data-test': `${dataTest}_button`,
        className: isCustom
            ? `${className}`
            : `flc ${styles.button} ${icon ? styles.hasIcon : ''} ${styles[variant]} ${className} ${isLoading ? styles.loading : ''}`,
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
        <button
            {...restProps}
            {...commonProps}
            type={type}
            style={style}
            onClick={(event) => {
                clickHandler?.(event);
            }}
        >
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
    );
};

export default Button;
