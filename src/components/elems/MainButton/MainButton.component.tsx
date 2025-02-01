import { FC } from 'react';
import Link from 'next/link';
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
}) => {
    const commonProps = {
        disabled,
        onClick: clickHandler,
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
            {icon && <span className={`flc ${styles.icon}`}>{icon}</span>}
            {children}
        </button>
    );
};

export default MainButton;
