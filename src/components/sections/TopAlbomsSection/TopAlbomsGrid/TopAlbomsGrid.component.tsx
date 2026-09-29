import { FC } from 'react';
import TopAlbomCard from '@/components/cards/TopAlbomCard/TopAlbomCard.component';
import styles from '@/components/sections/TopAlbomsSection/TopAlbomsGrid/TopAlbomsGrid.module.scss';
import { TopAlbomsGridPropsIF } from '@/components/sections/TopAlbomsSection/TopAlbomsGrid/TopAlbomsGrid.types';
import {
    TOP_ALBOMS_LABELS,
    TOP_ALBOMS_WIDE_INDEXES,
} from '@/components/sections/TopAlbomsSection/TopAlbomsSection.config';

const TopAlbomsGrid: FC<TopAlbomsGridPropsIF> = ({
    alboms,
    activeIndex,
    className = '',
    clickHandler,
}) => (
    <ul
        className={`${styles.grid} ${className}`}
        aria-label={TOP_ALBOMS_LABELS.grid}
    >
        {alboms.map((albom, index) => (
            <li
                key={`${albom.position}-${albom.title}`}
                className={`${styles.cell} ${styles[`area${index + 1}`]}`}
            >
                <TopAlbomCard
                    albom={albom}
                    index={index}
                    isWide={TOP_ALBOMS_WIDE_INDEXES.includes(index)}
                    isActive={index === activeIndex}
                    clickHandler={clickHandler}
                />
            </li>
        ))}
    </ul>
);

export default TopAlbomsGrid;
