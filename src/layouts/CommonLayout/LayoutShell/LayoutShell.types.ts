import { ReactNode } from 'react';

export interface LayoutShellContextIF {
    isBurgerOpen: boolean;
    isSidebarOpen: boolean;
    toggleBurger: () => void;
    toggleSidebar: () => void;
    closeBurger: () => void;
    closeSidebar: () => void;
}

export interface LayoutShellPropsIF {
    children: ReactNode;
}
