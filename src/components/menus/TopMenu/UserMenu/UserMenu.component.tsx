'use client';

import { FC, useRef, useState } from 'react';
import Link from 'next/link';
import { CurrentUserIF } from '@/types/user';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import { getSessionStorageItem } from '@/helpers/storage/storage.helpers';
import Img from '@/components/elems/Img/Img.component';
import { getUserMenu } from '@/components/menus/TopMenu/UserMenu/UserMenu.config';
import { userMenuClickHandler } from '@/components/menus/TopMenu/UserMenu/UserMenu.helpers';
import styles from '@/components/menus/TopMenu/UserMenu/UserMenu.module.scss';

const UserMenu: FC = () => {
    const menuWrapperRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useOutsideClick(menuWrapperRef, setIsOpen);

    const currentUser = getSessionStorageItem<CurrentUserIF>(
        STORAGE_KEYS.CurrentUser,
    );

    return (
        <div className={styles.userMenuWrapper} ref={menuWrapperRef}>
            <button
                type="button"
                className={`flc ${styles.toggleMenu} ${isOpen ? styles.opened : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Img url={currentUser?.avatarUrl} />
            </button>
            {isOpen && (
                <ul className={`flcol ${styles.menuList}`}>
                    {getUserMenu().map(({ label, icon, callBackType, url }) =>
                        callBackType ? (
                            <li
                                key={`${url}${callBackType}`}
                                className={styles.menuItem}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        userMenuClickHandler(callBackType)
                                    }
                                >
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
                        ),
                    )}
                </ul>
            )}
        </div>
    );
};

export default UserMenu;
