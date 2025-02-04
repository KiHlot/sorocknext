import { ReactElement } from 'react';

export interface MenuItemIF {
    url: string;
    label: string;
    icon: ReactElement;
    hasBorder?: boolean;
}

export interface LeftMenuItemPropsIF {
    data: MenuItemIF;
}
