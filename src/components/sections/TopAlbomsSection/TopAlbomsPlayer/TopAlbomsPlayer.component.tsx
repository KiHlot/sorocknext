'use client';

import { FC, useEffect, useRef } from 'react';
import { mountMusicEmbed } from '@/helpers/mountMusicEmbed';
import styles from '@/components/sections/TopAlbomsSection/TopAlbomsPlayer/TopAlbomsPlayer.module.scss';
import { TopAlbomsPlayerPropsIF } from '@/components/sections/TopAlbomsSection/TopAlbomsPlayer/TopAlbomsPlayer.types';
import { TOP_ALBOMS_LABELS } from '@/components/sections/TopAlbomsSection/TopAlbomsSection.config';

const TopAlbomsPlayer: FC<TopAlbomsPlayerPropsIF> = ({
    musicCode,
    className = '',
}) => {
    const playerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = playerRef.current;

        if (!root || !musicCode) {
            return;
        }

        let isActive = true;

        void mountMusicEmbed(root, musicCode, () => isActive);

        return () => {
            isActive = false;
            root.innerHTML = '';
        };
    }, [musicCode]);

    return (
        <div
            ref={playerRef}
            className={`${styles.player} ${className}`}
            role="region"
            aria-label={TOP_ALBOMS_LABELS.player}
        />
    );
};

export default TopAlbomsPlayer;
