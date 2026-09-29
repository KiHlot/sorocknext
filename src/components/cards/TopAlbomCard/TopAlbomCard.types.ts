import { MouseEvent } from 'react';
import { TopAlbomIF } from '@/components/sections/TopAlbomsSection/TopAlbomsSection.types';

export interface TopAlbomCardPropsIF {
    albom: TopAlbomIF;
    index: number;
    isWide?: boolean;
    isActive?: boolean;
    className?: string;
    clickHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
}
