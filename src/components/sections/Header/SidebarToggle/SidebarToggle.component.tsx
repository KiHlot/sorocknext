'use client';

import { FC, MouseEvent } from 'react';
import { TbLayoutSidebarRight } from 'react-icons/tb';
import {
    SIDEBAR_BUTTON_ID,
    SIDEBAR_PANEL_ID,
} from '@/layouts/CommonLayout/LayoutShell/LayoutShell.config';
import { useLayoutShell } from '@/layouts/CommonLayout/LayoutShell/LayoutShell.context';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/sections/Header/SidebarToggle/SidebarToggle.module.scss';

const handleToggleMouseDown = (event: MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
};

const SidebarToggle: FC = () => {
    const { isSidebarOpen, toggleSidebar } = useLayoutShell();

    const handleToggle = (): void => {
        toggleSidebar();
    };

    return (
        <Button
            id={SIDEBAR_BUTTON_ID}
            type="button"
            isCustom
            dataTest="sidebar_toggle"
            className={`${styles.toggle} ${isSidebarOpen ? styles.opened : ''}`}
            aria-expanded={isSidebarOpen}
            aria-controls={SIDEBAR_PANEL_ID}
            aria-label={
                isSidebarOpen
                    ? 'Закрыть боковую панель'
                    : 'Открыть боковую панель'
            }
            clickHandler={handleToggle}
            onMouseDown={handleToggleMouseDown}
        >
            <TbLayoutSidebarRight />
        </Button>
    );
};

export default SidebarToggle;
