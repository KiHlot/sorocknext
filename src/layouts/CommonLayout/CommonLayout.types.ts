import { ReactNode } from 'react';

interface CommonProps {
    children: ReactNode;
}

export interface CommonLayoutPropsIF extends CommonProps {}

export interface CommonLayoutContentPropsIF extends CommonProps {
    className?: string;
}

export interface CommonLayoutSidebarPropsIF extends CommonProps {}
