'use client';

import { FC, MouseEvent, useId, useState } from 'react';
import Section from '@/components/blocks/Section/Section.component';
import TopAlbumsGrid from '@/components/sections/TopAlbumsSection/TopAlbumsGrid/TopAlbumsGrid.component';
import TopAlbumsPlayer from '@/components/sections/TopAlbumsSection/TopAlbumsPlayer/TopAlbumsPlayer.component';
import {
    TOP_ALBUMS_LABELS,
    TOP_ALBUMS_LIMIT,
} from '@/components/sections/TopAlbumsSection/TopAlbumsSection.config';
import styles from '@/components/sections/TopAlbumsSection/TopAlbumsSection.module.scss';
import { TopAlbumsSectionPropsIF } from '@/components/sections/TopAlbumsSection/TopAlbumsSection.types';
import TopAlbumsTabs from '@/components/sections/TopAlbumsSection/TopAlbumsTabs/TopAlbumsTabs.component';

const TopAlbumsSection: FC<TopAlbumsSectionPropsIF> = ({ data }) => {
    const baseId = useId();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeAlbumIndex, setActiveAlbumIndex] = useState(0);
    const lists = data
        .filter((list) => list.albums?.length)
        .map((list) => ({
            ...list,
            albums: list.albums.slice(0, TOP_ALBUMS_LIMIT),
        }));
    const activeList = lists[activeTabIndex] ?? lists[0];

    if (!activeList) {
        return null;
    }

    const activeAlbum = activeList.albums[activeAlbumIndex];
    const hasTabs = lists.length > 1;

    const handleSelectTab = (index: number): void => {
        if (index === activeTabIndex) {
            return;
        }

        setActiveTabIndex(index);
        setActiveAlbumIndex(0);
    };

    const handleSelectAlbum = (event: MouseEvent<HTMLButtonElement>): void => {
        const albumIndex = Number(event.currentTarget.dataset.index);

        if (!Number.isInteger(albumIndex)) {
            return;
        }

        setActiveAlbumIndex(albumIndex);
    };

    return (
        <Section ariaLabel={TOP_ALBUMS_LABELS.section} title={activeList.title}>
            <div className={styles.body}>
                <TopAlbumsPlayer
                    musicCode={activeAlbum?.musicCode ?? ''}
                    className={styles.player}
                />
                <div className={`flcol ${styles.content}`}>
                    {hasTabs && (
                        <TopAlbumsTabs
                            tabs={lists.map((list) => list.tabTitle)}
                            activeIndex={activeTabIndex}
                            baseId={baseId}
                            onSelectTab={handleSelectTab}
                        />
                    )}
                    <div
                        id={`${baseId}-panel`}
                        role={hasTabs ? 'tabpanel' : undefined}
                        aria-labelledby={
                            hasTabs
                                ? `${baseId}-tab-${activeTabIndex}`
                                : undefined
                        }
                    >
                        <TopAlbumsGrid
                            albums={activeList.albums}
                            activeIndex={activeAlbumIndex}
                            clickHandler={handleSelectAlbum}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default TopAlbumsSection;
