'use client';

import { FC, useEffect, useState } from 'react';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import SiteEmail from '@/components/elems/SiteEmail/SiteEmail.component';
import SearchForm from '@/components/menus/TopMenu/SearchForm/SearchForm.component';
import styles from '@/components/menus/TopMenu/TopMenu.module.scss';
import TrendsSlider from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.component';

const TopMenu: FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={`hide ${styles.topMenuWrapper} ${isScrolled ? styles.scrolled : ''}`}
        >
            <MainWrapper className={styles.mainWrapper}>
                <MainLogo />
                <TrendsSlider className={`${styles.ml} ${styles.mr}`} />
                <SearchForm />
                <SiteEmail />
            </MainWrapper>
        </div>
    );
};

export default TopMenu;
