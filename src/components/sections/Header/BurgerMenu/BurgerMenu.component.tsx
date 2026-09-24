'use client';

import { FC, MouseEvent, useEffect, useRef } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';
import { useOutsideClick } from '@/hooks/outsideClick.hook';
import {
    BURGER_BUTTON_ID,
    BURGER_PANEL_ID,
} from '@/layouts/CommonLayout/LayoutShell/LayoutShell.config';
import { useLayoutShell } from '@/layouts/CommonLayout/LayoutShell/LayoutShell.context';
import Button from '@/components/controls/Button/Button.component';
import Overlay from '@/components/elems/Overlay/Overlay.component';
import overlayStyles from '@/components/elems/Overlay/Overlay.module.scss';
import SiteEmail from '@/components/elems/SiteEmail/SiteEmail.component';
import LeftMenu from '@/components/menus/LeftMenu/LeftMenu.component';
import styles from '@/components/sections/Header/BurgerMenu/BurgerMenu.module.scss';
import SearchForm from '@/components/sections/Header/SearchForm/SearchForm.component';

const handleToggleMouseDown = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
};

const BurgerPanel: FC = () => {
    const panelRef = useRef<HTMLDivElement>(null);
    const { closeBurger } = useLayoutShell();

    useOutsideClick(panelRef, closeBurger);

    useEffect(() => {
        panelRef.current?.focus();

        return () => {
            document
                .querySelector<HTMLButtonElement>(`#${BURGER_BUTTON_ID}`)
                ?.focus();
        };
    }, []);

    return (
        <Overlay className={overlayStyles.belowHeader}>
            <div
                id={BURGER_PANEL_ID}
                ref={panelRef}
                className={styles.panel}
                role="dialog"
                aria-modal="true"
                aria-label="Меню"
                tabIndex={-1}
            >
                <div className={styles.drawerSearch}>
                    <SearchForm />
                </div>
                <LeftMenu />
                <div className={styles.drawerEmail}>
                    <SiteEmail />
                </div>
            </div>
        </Overlay>
    );
};

const BurgerMenu: FC = () => {
    const { isBurgerOpen, toggleBurger } = useLayoutShell();

    const handleToggle = (): void => {
        toggleBurger();
    };

    return (
        <>
            <Button
                id={BURGER_BUTTON_ID}
                type="button"
                isCustom
                dataTest="burger_toggle"
                className={`${styles.toggle} ${isBurgerOpen ? styles.opened : ''}`}
                aria-expanded={isBurgerOpen}
                aria-controls={BURGER_PANEL_ID}
                aria-label={isBurgerOpen ? 'Закрыть меню' : 'Открыть меню'}
                clickHandler={handleToggle}
                onMouseDown={handleToggleMouseDown}
            >
                {isBurgerOpen ? <IoClose /> : <IoMenu />}
            </Button>
            {isBurgerOpen && <BurgerPanel />}
        </>
    );
};

export default BurgerMenu;
