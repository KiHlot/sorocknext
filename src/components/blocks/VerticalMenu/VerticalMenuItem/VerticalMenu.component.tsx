'use client';

import { FC, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/components/blocks/VerticalMenu/VerticalMenuItem/VerticalMenu.module.scss';
import { VerticalMenuItemPropsIF } from '@/components/blocks/VerticalMenu/VerticalMenuItem/VerticalMenu.types';

const VerticalMenuItem: FC<VerticalMenuItemPropsIF> = ({ data }) => {
    const { label, url, icon, hasBorder } = data;
    const pathname = usePathname();

    const isCurrent = useMemo(() => {
        if (!pathname) return false;

        const pathSegments = pathname.split('/').filter(Boolean);
        const urlSegments = url.split('/').filter(Boolean);

        // Сравниваем последний сегмент пути
        return (
            pathSegments[pathSegments.length - 1] ===
            urlSegments[urlSegments.length - 1]
        );
    }, [pathname, url]);

    return (
        <li
            className={`${styles.verticalMenuItemWrapper} ${hasBorder ? styles.border : ''}`}
        >
            <Link
                href={url}
                title={label}
                className={isCurrent ? styles.current : ''}
            >
                <span className={`flc ${styles.icon}`}>{icon}</span>
                <span>{label}</span>
            </Link>
        </li>
    );
};

export default VerticalMenuItem;
