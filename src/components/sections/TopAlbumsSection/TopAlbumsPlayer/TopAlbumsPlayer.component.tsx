'use client';

import { FC, useEffect, useRef } from 'react';
import { mountMusicEmbed } from '@/helpers/mountMusicEmbed';
import styles from '@/components/sections/TopAlbumsSection/TopAlbumsPlayer/TopAlbumsPlayer.module.scss';
import { TopAlbumsPlayerPropsIF } from '@/components/sections/TopAlbumsSection/TopAlbumsPlayer/TopAlbumsPlayer.types';
import { TOP_ALBUMS_LABELS } from '@/components/sections/TopAlbumsSection/TopAlbumsSection.config';

const TopAlbumsPlayer: FC<TopAlbumsPlayerPropsIF> = ({
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
            aria-label={TOP_ALBUMS_LABELS.player}
        />
    );
};

export default TopAlbumsPlayer;
