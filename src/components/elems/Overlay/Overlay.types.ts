import { ReactNode } from 'react';

export interface OverlayPropsIF {
    className?: string;
    children: ReactNode;
    isolationMode?: boolean;
}
