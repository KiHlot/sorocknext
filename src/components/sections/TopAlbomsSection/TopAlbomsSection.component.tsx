'use client';

import { FC, MouseEvent, useId, useState } from 'react';
import Section from '@/components/blocks/Section/Section.component';
import TopAlbomsGrid from '@/components/sections/TopAlbomsSection/TopAlbomsGrid/TopAlbomsGrid.component';
import TopAlbomsPlayer from '@/components/sections/TopAlbomsSection/TopAlbomsPlayer/TopAlbomsPlayer.component';
import {
    TOP_ALBOMS_LABELS,
    TOP_ALBOMS_LIMIT,
} from '@/components/sections/TopAlbomsSection/TopAlbomsSection.config';
import styles from '@/components/sections/TopAlbomsSection/TopAlbomsSection.module.scss';
import { TopAlbomsSectionPropsIF } from '@/components/sections/TopAlbomsSection/TopAlbomsSection.types';
import TopAlbomsTabs from '@/components/sections/TopAlbomsSection/TopAlbomsTabs/TopAlbomsTabs.component';

const TopAlbomsSection: FC<TopAlbomsSectionPropsIF> = ({ data }) => {
    const baseId = useId();
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [activeAlbomIndex, setActiveAlbomIndex] = useState(0);
    const lists = data
        .filter((list) => list.alboms?.length)
        .map((list) => ({
            ...list,
            alboms: list.alboms.slice(0, TOP_ALBOMS_LIMIT),
        }));
    const activeList = lists[activeTabIndex] ?? lists[0];

    if (!activeList) {
        return null;
    }

    const activeAlbom = activeList.alboms[activeAlbomIndex];
    const hasTabs = lists.length > 1;

    const handleSelectTab = (index: number): void => {
        if (index === activeTabIndex) {
            return;
        }

        setActiveTabIndex(index);
        setActiveAlbomIndex(0);
    };

    const handleSelectAlbom = (event: MouseEvent<HTMLButtonElement>): void => {
        const albomIndex = Number(event.currentTarget.dataset.index);

        if (!Number.isInteger(albomIndex)) {
            return;
        }

        setActiveAlbomIndex(albomIndex);
    };

    return (
        <Section ariaLabel={TOP_ALBOMS_LABELS.section} title={activeList.title}>
            <div className={styles.body}>
                <TopAlbomsPlayer
                    musicCode={activeAlbom?.musicCode ?? ''}
                    className={styles.player}
                />
                <div className={`flcol ${styles.content}`}>
                    {hasTabs && (
                        <TopAlbomsTabs
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
                        <TopAlbomsGrid
                            alboms={activeList.alboms}
                            activeIndex={activeAlbomIndex}
                            clickHandler={handleSelectAlbom}
                        />
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default TopAlbomsSection;
