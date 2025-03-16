import { ReactElement } from 'react';

export interface ButtonGroupIF<T = string> {
    key: T;
    label: ReactElement;
    href?: string;
}

export interface ButtonsGroupPropsIF {
    className?: string;
    config: ButtonGroupIF[];
    fullWidth?: boolean;
    controls: {
        activeTab: string;
        setActiveTab?: (key: string) => void;
    };
}
