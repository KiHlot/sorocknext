'use client';

import {
    FC,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { usePathname } from 'next/navigation';
import {
    BURGER_MAX_WIDTH,
    SIDEBAR_MAX_WIDTH,
} from '@/layouts/CommonLayout/LayoutShell/LayoutShell.config';
import {
    LayoutShellContextIF,
    LayoutShellPropsIF,
} from '@/layouts/CommonLayout/LayoutShell/LayoutShell.types';
import { toggleOverflow } from '@/components/interactive/ModalSheet/ModalSheet.helpers';

const LayoutShellContext = createContext<LayoutShellContextIF | null>(null);

const LayoutShellProvider: FC<LayoutShellPropsIF> = ({ children }) => {
    const pathname = usePathname();
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const closeBurger = useCallback((): void => {
        setIsBurgerOpen(false);
    }, []);

    const closeSidebar = useCallback((): void => {
        setIsSidebarOpen(false);
    }, []);

    const toggleBurger = useCallback((): void => {
        setIsBurgerOpen((isOpen) => !isOpen);
        setIsSidebarOpen(false);
    }, []);

    const toggleSidebar = useCallback((): void => {
        setIsSidebarOpen((isOpen) => !isOpen);
        setIsBurgerOpen(false);
    }, []);

    useEffect(() => {
        setIsBurgerOpen(false);
        setIsSidebarOpen(false);
    }, [pathname]);

    useEffect(() => {
        const sidebarQuery = window.matchMedia(
            `(max-width: ${SIDEBAR_MAX_WIDTH}px)`,
        );
        const burgerQuery = window.matchMedia(
            `(max-width: ${BURGER_MAX_WIDTH}px)`,
        );

        const handleChange = (): void => {
            if (!sidebarQuery.matches) {
                setIsSidebarOpen(false);
            }

            if (!burgerQuery.matches) {
                setIsBurgerOpen(false);
            }
        };

        sidebarQuery.addEventListener('change', handleChange);
        burgerQuery.addEventListener('change', handleChange);

        return () => {
            sidebarQuery.removeEventListener('change', handleChange);
            burgerQuery.removeEventListener('change', handleChange);
        };
    }, []);

    useEffect(() => {
        if (!isBurgerOpen && !isSidebarOpen) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key !== 'Escape') {
                return;
            }

            setIsBurgerOpen(false);
            setIsSidebarOpen(false);
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isBurgerOpen, isSidebarOpen]);

    useEffect(() => {
        if (!isBurgerOpen && !isSidebarOpen) {
            return;
        }

        toggleOverflow(true);

        return () => {
            toggleOverflow(false);
        };
    }, [isBurgerOpen, isSidebarOpen]);

    const value = useMemo(
        () => ({
            isBurgerOpen,
            isSidebarOpen,
            toggleBurger,
            toggleSidebar,
            closeBurger,
            closeSidebar,
        }),
        [
            isBurgerOpen,
            isSidebarOpen,
            toggleBurger,
            toggleSidebar,
            closeBurger,
            closeSidebar,
        ],
    );

    return (
        <LayoutShellContext.Provider value={value}>
            {children}
        </LayoutShellContext.Provider>
    );
};

export const useLayoutShell = (): LayoutShellContextIF => {
    const context = useContext(LayoutShellContext);

    if (!context) {
        throw new Error(
            'useLayoutShell must be used within LayoutShellProvider',
        );
    }

    return context;
};

export default LayoutShellProvider;
