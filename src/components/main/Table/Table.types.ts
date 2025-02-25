import { ReactNode } from 'react';

export interface TableTitlesIF {
    title: string;
    sort?: boolean;
    isDefaultSort?: boolean;
}

export interface TablePropsIF {
    className?: string;
    titles?: TableTitlesIF[];
    children: ReactNode;
    setSelected?: (indexes: number[]) => void
}

export interface TableRowPropsIF {
    children: ReactNode;
}

export interface RowItemPropsIF {
    children: ReactNode;
    className?: string;
}
