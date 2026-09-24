'use client';

import { FC, useEffect, useRef } from 'react';
import { useOutsideClick } from '@/hooks/outsideClick.hook';
import styles from '@/layouts/CommonLayout/CommonLayout.module.scss';
import { CommonPropsIF } from '@/layouts/CommonLayout/CommonLayout.types';
import {
    SIDEBAR_BUTTON_ID,
    SIDEBAR_PANEL_ID,
} from '@/layouts/CommonLayout/LayoutShell/LayoutShell.config';
import { useLayoutShell } from '@/layouts/CommonLayout/LayoutShell/LayoutShell.context';
import Overlay from '@/components/elems/Overlay/Overlay.component';
import overlayStyles from '@/components/elems/Overlay/Overlay.module.scss';

const Sidebar: FC<CommonPropsIF> = ({ children }) => {
    const panelRef = useRef<HTMLElement>(null);
    const wasOpenRef = useRef(false);
    const { isSidebarOpen, closeSidebar } = useLayoutShell();

    useOutsideClick(panelRef, isSidebarOpen ? closeSidebar : null);

    useEffect(() => {
        if (isSidebarOpen) {
            wasOpenRef.current = true;
            panelRef.current?.focus();
            return;
        }

        if (!wasOpenRef.current) {
            return;
        }

        wasOpenRef.current = false;
        document
            .querySelector<HTMLButtonElement>(`#${SIDEBAR_BUTTON_ID}`)
            ?.focus();
    }, [isSidebarOpen]);

    return (
        <>
            <aside
                id={SIDEBAR_PANEL_ID}
                ref={panelRef}
                className={`flcol gapLayout ${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
                role={isSidebarOpen ? 'dialog' : undefined}
                aria-modal={isSidebarOpen || undefined}
                aria-label="Боковая панель"
                tabIndex={isSidebarOpen ? -1 : undefined}
            >
                {children}
            </aside>
            {isSidebarOpen && (
                <Overlay className={overlayStyles.belowHeader}>{null}</Overlay>
            )}
        </>
    );
};

export default Sidebar;
