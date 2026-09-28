'use client';

import { FC, MouseEvent, useState } from 'react';
import { IoPlay } from 'react-icons/io5';
import { VideoIF } from '@/types/post';
import styles from '@/components/sections/PostVideoSection/PostVideoSection.module.scss';
import { PostVideoSectionPropsIF } from '@/components/sections/PostVideoSection/PostVideoSection.types';

const getVideoMeta = (video: VideoIF): string => {
    const artistsLabel = (video.videoInfo.artists ?? [])
        .map((artist) => artist.trim())
        .filter((artist) => artist.length > 0)
        .join(', ');
    const yearLabel =
        video.videoInfo.year === null ? '' : String(video.videoInfo.year);

    return [artistsLabel, yearLabel]
        .filter((part) => part.length > 0)
        .join(' · ');
};

const PostVideoSection: FC<PostVideoSectionPropsIF> = ({ videos }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const activeVideo = videos[activeIndex] ?? videos[0];

    const handlePlay = (): void => setIsPlaying(true);

    const handleSelect = (event: MouseEvent<HTMLButtonElement>): void => {
        const index = Number(event.currentTarget.dataset.index);

        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= videos.length ||
            index === activeIndex
        ) {
            return;
        }

        setActiveIndex(index);
        setIsPlaying(false);
    };

    if (!activeVideo) {
        return null;
    }

    const { title, coverImg } = activeVideo.videoInfo;
    const meta = getVideoMeta(activeVideo);
    const videoTitle = title.trim();
    const coverUrl = coverImg.trim();
    const hasCaption = Boolean(meta || videoTitle);
    const isSingle = videos.length === 1;

    return (
        <section className={styles.postVideoSectionWrapper} aria-label="Видео">
            <div
                className={
                    isSingle
                        ? `${styles.stage} ${styles.stageSingle}`
                        : styles.stage
                }
            >
                {isPlaying ? (
                    <div
                        className={styles.player}
                        dangerouslySetInnerHTML={{
                            __html: activeVideo.videoCode,
                        }}
                    />
                ) : (
                    <button
                        type="button"
                        className={styles.poster}
                        onClick={handlePlay}
                        aria-label={hasCaption ? undefined : 'Смотреть видео'}
                    >
                        {coverUrl && (
                            <span
                                className={`bgc ${styles.cover}`}
                                style={{
                                    backgroundImage: `url(${coverUrl})`,
                                }}
                                aria-hidden="true"
                            />
                        )}
                        <span className={styles.shade} aria-hidden="true" />
                        <span className={styles.play} aria-hidden="true">
                            <IoPlay />
                        </span>
                        {hasCaption &&
                            (isSingle ? (
                                <span className={styles.singleCaption}>
                                    {videoTitle && (
                                        <span className={styles.singleTitle}>
                                            {videoTitle}
                                        </span>
                                    )}
                                    {meta && (
                                        <span className={styles.singleMeta}>
                                            {meta}
                                        </span>
                                    )}
                                </span>
                            ) : (
                                <span className={styles.caption}>
                                    {meta && (
                                        <span className={styles.meta}>
                                            {meta}
                                        </span>
                                    )}
                                    {videoTitle && (
                                        <span className={styles.title}>
                                            {videoTitle}
                                        </span>
                                    )}
                                </span>
                            ))}
                    </button>
                )}
            </div>
            {videos.length > 1 && (
                <div className={styles.playlistWrap}>
                    <ul
                        className={`cvscroll ${styles.playlist}`}
                        aria-label="Записи"
                    >
                        {videos.map((item, index) => {
                            const itemTitle =
                                item.videoInfo.title.trim() || 'Видео';
                            const itemMeta = getVideoMeta(item);
                            const isActive = index === activeIndex;

                            return (
                                <li key={`${item.videoCode}-${itemTitle}`}>
                                    <button
                                        type="button"
                                        className={
                                            isActive
                                                ? `${styles.track} ${styles.trackActive}`
                                                : styles.track
                                        }
                                        data-index={index}
                                        onClick={handleSelect}
                                        aria-current={
                                            isActive ? 'true' : undefined
                                        }
                                    >
                                        <span className={styles.trackTitle}>
                                            {itemTitle}
                                        </span>
                                        {itemMeta && (
                                            <span className={styles.trackMeta}>
                                                {itemMeta}
                                            </span>
                                        )}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </section>
    );
};

export default PostVideoSection;
