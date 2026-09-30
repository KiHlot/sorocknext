import { MouseEvent } from 'react';
import { TopAlbumIF } from '@/components/sections/TopAlbumsSection/TopAlbumsSection.types';

export interface TopAlbumsGridPropsIF {
    albums: TopAlbumIF[];
    activeIndex: number;
    className?: string;
    clickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}
