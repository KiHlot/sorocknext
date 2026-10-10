import { ReactNode } from 'react';

export interface SidebarSliderSlideIF {
    key: string;
    content: ReactNode;
}

export interface SidebarSliderPropsIF {
    title: string;
    titleId: string;
    dotsLabel: string;
    getSlideLabel: (index: number, total: number) => string;
    slides: SidebarSliderSlideIF[];
}
