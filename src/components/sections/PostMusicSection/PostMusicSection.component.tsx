'use client';

import { FC, useEffect, useRef } from 'react';
import { mountMusicEmbed } from '@/components/sections/PostMusicSection/PostMusicSection.helpers';
import styles from '@/components/sections/PostMusicSection/PostMusicSection.module.scss';
import { PostMusicSectionPropsIF } from '@/components/sections/PostMusicSection/PostMusicSection.types';

const PostMusicSection: FC<PostMusicSectionPropsIF> = ({ music }) => {
    const playerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = playerRef.current;

        if (!root) {
            return;
        }

        let isActive = true;

        void mountMusicEmbed(root, music.musicCode, () => isActive);

        return () => {
            isActive = false;
            root.innerHTML = '';
        };
    }, [music.musicCode]);

    return (
        <section
            className={styles.postMusicSectionWrapper}
            aria-label="Альбом"
        >
            <div ref={playerRef} className={styles.player} />
        </section>
    );
};

export default PostMusicSection;
