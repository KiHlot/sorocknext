'use client';

import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/controls/Button/Button.module.scss';
import { ButtonPropsIF } from '@/components/controls/Button/Button.types';

const Button: FC<ButtonPropsIF> = ({
    children,
    href,
    target,
    rel,
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
    const classNameValue = isCustom
        ? `${className}`
        : `flc ${styles.button} ${icon ? styles.hasIcon : ''} ${styles[variant]} ${className} ${isLoading ? styles.loading : ''}`;
    const dataTestValue = `${dataTest}_button`;

    if (href) {
        return (
            <Link
                data-test={dataTestValue}
                className={classNameValue}
                href={href}
                target={target}
                rel={rel}
                aria-label={restProps['aria-label']}
            >
                {icon && <span className={`flc ${styles.icon}`}>{icon}</span>}
                {children}
            </Link>
        );
    }

    if (htmlFor) {
        return (
            <label
                data-test={dataTestValue}
                className={classNameValue}
                htmlFor={htmlFor}
            >
                {icon && <span className={`flc ${styles.icon}`}>{icon}</span>}
                {children}
            </label>
        );
    }

    return (
        <button
            {...restProps}
            disabled={disabled || isLoading}
            data-test={dataTestValue}
            className={classNameValue}
            type={type}
            style={style}
            onClick={(event) => {
                clickHandler?.(event);
            }}
        >
            {isLoading &&
                ['primary', 'secondary', 'secondarySmall'].includes(
                    variant,
                ) && (
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
