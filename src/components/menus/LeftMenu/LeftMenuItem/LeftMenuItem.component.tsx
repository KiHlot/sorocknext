'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/components/menus/LeftMenu/LeftMenuItem/LeftMenuItem.module.scss';
import { LeftMenuItemPropsIF } from '@/components/menus/LeftMenu/LeftMenuItem/LeftMenuItem.types';

const LeftMenuItem: FC<LeftMenuItemPropsIF> = ({ data }) => {
    const { label, url, icon, hasBorder } = data;

    const pathname = usePathname();

    const [isCurrent, setIsCurrent] = useState<boolean>(false);

    useEffect(() => {
        if (!pathname) {
            return;
        }

        setIsCurrent(pathname.includes(url));
    }, [pathname]);

    return (
        <div
            className={`${styles.leftMenuItemWrapper} ${hasBorder ? styles.border : ''}`}
        >
            <Link
                href={url}
                title={label}
                className={isCurrent ? styles.current : ''}
            >
                <span className={`flc ${styles.icon}`}>{icon}</span>
                <span>{label}</span>
            </Link>
        </div>
    );
};

export default LeftMenuItem;
