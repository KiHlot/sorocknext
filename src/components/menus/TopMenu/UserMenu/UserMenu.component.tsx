'use client';

import { FC, useRef, useState } from 'react';
import Link from 'next/link';
import { getStorageItem } from '@/helpers/utils';
import Img from '@/components/elems/Img/Img.component';
import { getUserMenu } from '@/components/menus/TopMenu/UserMenu/UserMenu.config';
import styles from '@/components/menus/TopMenu/UserMenu/UserMenu.module.scss';
import { useLogout } from '@/hooks/useLogout';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { CallBackTypeT } from '@/types/common';
import { CurrentUserIF } from '@/types/user';

const UserMenu: FC = () => {
    const menuWrapperRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    useOutsideClick(menuWrapperRef, setIsOpen);

    const currentUser = getStorageItem<CurrentUserIF>('currentUser');

    const clickHandler = (callBackType: CallBackTypeT) => {
        switch (callBackType) {
            case 'logout':
                useLogout();
                break;
            default:
                break;
        }
    };

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
                    {getUserMenu().map(({ label, icon, callBackType, url }) => {
                        return callBackType ? (
                            <li
                                key={`${url}${callBackType}`}
                                className={styles.menuItem}
                            >
                                <button
                                    type="button"
                                    onClick={() => clickHandler(callBackType)}
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
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default UserMenu;
