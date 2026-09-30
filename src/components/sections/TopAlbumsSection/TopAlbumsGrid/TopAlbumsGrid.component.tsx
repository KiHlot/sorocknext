import { FC } from 'react';
import TopAlbumCard from '@/components/cards/TopAlbumCard/TopAlbumCard.component';
import styles from '@/components/sections/TopAlbumsSection/TopAlbumsGrid/TopAlbumsGrid.module.scss';
import { TopAlbumsGridPropsIF } from '@/components/sections/TopAlbumsSection/TopAlbumsGrid/TopAlbumsGrid.types';
import {
    TOP_ALBUMS_LABELS,
    TOP_ALBUMS_WIDE_INDEXES,
} from '@/components/sections/TopAlbumsSection/TopAlbumsSection.config';

const TopAlbumsGrid: FC<TopAlbumsGridPropsIF> = ({
    albums,
    activeIndex,
    className = '',
    clickHandler,
}) => (
    <ul
        className={`${styles.grid} ${className}`}
        aria-label={TOP_ALBUMS_LABELS.grid}
    >
        {albums.map((album, index) => (
            <li
                key={`${album.position}-${album.title}`}
                className={`${styles.cell} ${styles[`area${index + 1}`]}`}
            >
                <TopAlbumCard
                    album={album}
                    index={index}
                    isWide={TOP_ALBUMS_WIDE_INDEXES.includes(index)}
                    isActive={index === activeIndex}
                    clickHandler={clickHandler}
                />
            </li>
        ))}
    </ul>
);

export default TopAlbumsGrid;
