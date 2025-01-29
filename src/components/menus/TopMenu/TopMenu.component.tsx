'use client';

import { FC, useEffect, useState } from 'react';
import { POINTINT } from '@/helpers/config';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import SiteEmail from '@/components/elems/SiteEmail/SiteEmail.component';
import SearchForm from '@/components/menus/TopMenu/SearchForm/SearchForm.component';
import styles from '@/components/menus/TopMenu/TopMenu.module.scss';
import { TopMenuPropsIF } from '@/components/menus/TopMenu/TopMenu.types';
import TrendsSlider from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.component';

const TopMenu: FC<TopMenuPropsIF> = ({ className }) => {
    const [isLessThenMd, setIsLessThenMd] = useState<boolean>(false);

    useEffect(() => {
        setIsLessThenMd(
            Number(typeof window !== 'undefined' && window?.innerWidth) <=
                POINTINT.md,
        );
    }, []);

    return (
        <div className={`hide ${styles.topMenuWrapper} ${className || ''}`}>
            <>
                {isLessThenMd ? (
                    <>
                        <MainLogo className={styles.logo} />
                        <h1>Сорок Ру комьюнити. Только лучшее!</h1>
                    </>
                ) : (
                    <SearchForm />
                )}
            </>
            <TrendsSlider />
            {!isLessThenMd && <SiteEmail />}
        </div>
    );
};

export default TopMenu;
