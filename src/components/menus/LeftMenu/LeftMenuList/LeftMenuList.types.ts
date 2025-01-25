import { ReactElement } from 'react';

export interface LeftMenuListPropsIF {
    className: string;
}

export interface MenuItemIF {
    url: string;
    label: string;
    icon: ReactElement;
}
