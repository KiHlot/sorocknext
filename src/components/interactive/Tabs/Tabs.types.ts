import { ReactNode } from 'react';

interface TabsConfigItemIF {
    key: string;
    label: ReactNode;
    elem: ReactNode;
}

export interface TabsPropsIF {
    className?: string;
    controls: {
        activeTab: string;
        setActiveTab: (key: string) => void;
    };
    config: TabsConfigItemIF[];
    fullWidth?: boolean;
}
