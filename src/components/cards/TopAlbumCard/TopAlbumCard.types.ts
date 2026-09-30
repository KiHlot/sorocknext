import { MouseEvent } from 'react';
import { TopAlbumIF } from '@/components/sections/TopAlbumsSection/TopAlbumsSection.types';

export interface TopAlbumCardPropsIF {
    album: TopAlbumIF;
    index: number;
    isWide?: boolean;
    isActive?: boolean;
    className?: string;
    clickHandler?: (event: MouseEvent<HTMLButtonElement>) => void;
}
