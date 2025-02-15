import { ReactElement } from 'react';

export interface ButtonGroupIF {
    key: string;
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
