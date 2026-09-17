'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LEFT_MENU } from '@/components/menus/LeftMenu/LeftMenu.config';
import styles from '@/components/menus/LeftMenu/LeftMenu.module.scss';

const LeftMenu: FC = () => {
    const pathname = usePathname();

    return (
        <nav aria-label="Главное меню" className={styles.leftMenuWrapper}>
            <ul className={`flcol ${styles.list}`}>
                {LEFT_MENU.map((item) => {
                    const { label, url, icon, hasBorder } = item;
                    const isCurrent =
                        pathname === url || pathname.startsWith(`${url}/`);

                    return (
                        <li
                            key={url}
                            className={`${styles.item} ${hasBorder ? styles.border : ''}`}
                        >
                            <Link
                                href={url}
                                title={label}
                                className={`${styles.link} ${isCurrent ? styles.current : ''}`}
                                aria-current={isCurrent ? 'page' : undefined}
                            >
                                <span
                                    className={`flc ${styles.icon}`}
                                    aria-hidden
                                >
                                    {icon}
                                </span>
                                <span>{label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default LeftMenu;
