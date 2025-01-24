'use client';

import { FC } from 'react';
import { POINTINT } from '@/helpers/config';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import SearchForm from '@/components/menus/TopMenu/SearchForm/SearchForm.component';
import styles from '@/components/menus/TopMenu/TopMenu.module.scss';
import { TopMenuPropsIF } from '@/components/menus/TopMenu/TopMenu.types';
import TrendsSlider from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.component';

const TopMenu: FC<TopMenuPropsIF> = ({ className }) => {

    return (
        <div className={`${styles.topMenuWrapper} ${className || ''}`}>
            <>
                {typeof window !== 'undefined' &&
                window?.innerWidth <= POINTINT.md ? (
                    <>
                        <MainLogo className={styles.logo} />
                        <h1>Сорок Ру комьюнити. Только лучшее!</h1>
                    </>
                ) : (
                    <SearchForm />
                )}
            </>
            <TrendsSlider />
        </div>
    );
};

export default TopMenu;
