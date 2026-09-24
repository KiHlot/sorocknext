'use client';

import { FC, useEffect, useState } from 'react';
import MainWrapper from '@/layouts/MainWrapper/MainWrapper.component';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import SiteEmail from '@/components/elems/SiteEmail/SiteEmail.component';
import BurgerMenu from '@/components/sections/Header/BurgerMenu/BurgerMenu.component';
import { SCROLL_LENGTH } from '@/components/sections/Header/Header.config';
import styles from '@/components/sections/Header/Header.module.scss';
import SearchForm from '@/components/sections/Header/SearchForm/SearchForm.component';
import SidebarToggle from '@/components/sections/Header/SidebarToggle/SidebarToggle.component';
import TrendsSlider from '@/components/sections/Header/TrendsSlider/TrendsSlider.component';
import UserMenu from '@/components/sections/Header/UserMenu/UserMenu.component';

const Header: FC = () => {
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
            className={`hide ${styles.headerWrapper} ${isScrolled ? styles.scrolled : ''}`}
        >
            <MainWrapper className={styles.mainWrapper}>
                <MainLogo />
                <TrendsSlider className={styles.mr} />
                <div className={styles.headerSearch}>
                    <SearchForm />
                </div>
                <div className={styles.headerEmail}>
                    <SiteEmail />
                </div>
                <SidebarToggle />
                <UserMenu />
                <BurgerMenu />
            </MainWrapper>
        </header>
    );
};

export default Header;
