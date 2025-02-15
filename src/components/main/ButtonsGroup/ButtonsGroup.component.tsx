'use client';

import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/main/ButtonsGroup/ButtonsGroup.module.scss';
import { ButtonsGroupPropsIF } from '@/components/main/ButtonsGroup/ButtonsGroup.types';

const ButtonsGroup: FC<ButtonsGroupPropsIF> = ({
    config,
    controls,
    fullWidth,
    className = '',
}) => {
    const { activeTab, setActiveTab } = controls;

    const clickHandler = (key: string) => {
        setActiveTab && setActiveTab(key);
    };

    return (
        <div className={`${styles.buttonsGroupWrapper} ${className}`}>
            {config.map(({ key, label, href }) =>
                href ? (
                    <Link
                        key={key}
                        href={href}
                        className={`flc ${styles.tabButton} ${fullWidth ? styles.fullWidth : ''} ${key === activeTab ? styles.active : ''}`}
                    >
                        {label}
                    </Link>
                ) : (
                    <button
                        type="button"
                        key={key}
                        className={`flc ${styles.tabButton} ${fullWidth ? styles.fullWidth : ''} ${key === activeTab ? styles.active : ''}`}
                        onClick={() => clickHandler(key)}
                    >
                        {label}
                    </button>
                ),
            )}
        </div>
    );
};

export default ButtonsGroup;
