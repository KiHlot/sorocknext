import { FC } from 'react';
import { POINTINT } from '@/helpers/config';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import styles from '@/components/menus/LeftMenu/LeftMenu.module.scss';
import { LeftMenuPropsIF } from '@/components/menus/LeftMenu/LeftMenu.types';
import SearchForm from '@/components/menus/TopMenu/SearchForm/SearchForm.component';

const LeftMenu: FC<LeftMenuPropsIF> = ({ isLeftMenuOpened }) => {
    const isLessThenMd =
        Number(typeof window !== 'undefined' && window?.innerWidth) <=
        POINTINT.md;

    return (
        <div className={`${styles.leftMenuWrapper} ${styles.opened}`}>
            {isLessThenMd ? (
                <SearchForm className={styles.searchForm} />
            ) : (
                <>
                    <MainLogo className="logo" />
                    {isLeftMenuOpened &&
                        (isHome ? (
                            <h1 className="logo_text">
                                Сорок Ру комьюнити. Только лучшее!
                            </h1>
                        ) : (
                            <div className="logo_text">
                                Сорок Ру комьюнити. Только лучшее!
                            </div>
                        ))}
                </>
            )}
            <LeftMenuList className={styles.menuList} />
            <LeftMenuFooter className={styles.menuFooter} />
            <ToggleLeftMenuButton isLeftMenuOpened={isLeftMenuOpened} />
        </div>
    );
};

export default LeftMenu;
