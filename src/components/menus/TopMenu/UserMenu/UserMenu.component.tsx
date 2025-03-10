'use client';

import { FC, useRef, useState } from 'react';
import Link from 'next/link';
import { getStorageItem } from '@/helpers/utils';
import Img from '@/components/elems/Img/Img.component';
import { getUserMenu } from '@/components/menus/TopMenu/UserMenu/UserMenu.config';
import styles from '@/components/menus/TopMenu/UserMenu/UserMenu.module.scss';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { ProfileIF } from '@/types/user';

const UserMenu: FC = () => {
    const menuWrapperRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const profileData = getStorageItem<ProfileIF>('profileData');

    useOutsideClick(menuWrapperRef, setIsOpen);
    //TODO справить ошибки в меню
    return (
        <div className={styles.userMenuWrapper} ref={menuWrapperRef}>
            <button
                type="button"
                className={`flc ${styles.toggleMenu} ${isOpen ? styles.opened : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Img url={profileData?.avatarUrl} />
            </button>
            {isOpen && (
                <ul className={`flcol ${styles.menuList}`}>
                    {getUserMenu().map(({ label, icon, callBackType, url }) => {
                        return callBackType ? (
                            <li className={styles.menuItem}>
                                <button>
                                    {icon}
                                    <span>{label}</span>
                                </button>
                            </li>
                        ) : (
                            <li
                                key={`${url}${callBackType}`}
                                className={styles.menuItem}
                            >
                                <Link href={url}>
                                    {icon}
                                    <span>{label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default UserMenu;
