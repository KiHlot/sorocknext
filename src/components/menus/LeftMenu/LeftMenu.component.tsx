'use client';

import { FC, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { POINTINT } from '@/helpers/config';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import styles from '@/components/menus/LeftMenu/LeftMenu.module.scss';
import SearchForm from '@/components/menus/TopMenu/SearchForm/SearchForm.component';
import LeftMenuList from '@/components/menus/LeftMenu/LeftMenuList/LeftMenuList.component';
import LeftMenuFooter from '@/components/menus/LeftMenu/LeftMenuFooter/LeftMenuFooter.component';
import ToggleLeftMenuButton from '@/components/menus/LeftMenu/ToggleLeftMenuButton/ToggleLeftMenuButton.component';

const LeftMenu: FC = () => {
    const pathname = usePathname();

    const { isLeftMenuOpened } = useAppSelector(
        (state: RootState) => state.globalDataSlice,
    );

    const [isLessThenMd, setIsLessThenMd] = useState<boolean>(false);

    useEffect(() => {
        setIsLessThenMd(
            Number(typeof window !== 'undefined' && window?.innerWidth) <=
                POINTINT.md,
        );
    }, []);

    return (
        <div
            className={`${styles.leftMenuWrapper} ${isLeftMenuOpened ? styles.opened : ''}`}
        >
            {isLessThenMd ? (
                <SearchForm className={styles.searchForm} />
            ) : (
                <>
                    <MainLogo className={styles.logo} />
                    {isLeftMenuOpened &&
                        (pathname === '/' ? (
                            <h1 className={styles.logoText}>
                                Сорок Ру комьюнити. Только лучшее!
                            </h1>
                        ) : (
                            <div className={styles.logoText}>
                                Сорок Ру комьюнити. Только лучшее!
                            </div>
                        ))}
                </>
            )}
            <LeftMenuList className={styles.menuList} />
            <LeftMenuFooter className={styles.menuFooter} />
            <ToggleLeftMenuButton />
        </div>
    );
};

export default LeftMenu;
