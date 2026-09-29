import { MouseEvent } from 'react';
import { TopAlbomIF } from '@/components/sections/TopAlbomsSection/TopAlbomsSection.types';

export interface TopAlbomsGridPropsIF {
    alboms: TopAlbomIF[];
    activeIndex: number;
    className?: string;
    clickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}
