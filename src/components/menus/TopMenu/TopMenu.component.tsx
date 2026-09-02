'use client';

import { FC, useEffect, useState } from 'react';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import SiteEmail from '@/components/elems/SiteEmail/SiteEmail.component';
import SearchForm from '@/components/menus/TopMenu/SearchForm/SearchForm.component';
import { SCROLL_LENGTH } from '@/components/menus/TopMenu/TopMenu.config';
import styles from '@/components/menus/TopMenu/TopMenu.module.scss';
import TrendsSlider from '@/components/menus/TopMenu/TrendsSlider/TrendsSlider.component';
import UserMenu from '@/components/menus/TopMenu/UserMenu/UserMenu.component';

const TopMenu: FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > SCROLL_LENGTH);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header
            className={`hide ${styles.topMenuWrapper} ${isScrolled ? styles.scrolled : ''}`}
        >
            <MainWrapper className={styles.mainWrapper}>
                <MainLogo />
                <TrendsSlider className={styles.mr} />
                <SearchForm />
                <SiteEmail />
                <UserMenu />
            </MainWrapper>
        </header>
    );
};

export default TopMenu;
