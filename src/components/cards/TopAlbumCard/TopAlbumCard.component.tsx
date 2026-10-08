import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/cards/TopAlbumCard/TopAlbumCard.module.scss';
import { TopAlbumCardPropsIF } from '@/components/cards/TopAlbumCard/TopAlbumCard.types';
import Button from '@/components/controls/Button/Button.component';
import Country from '@/components/elems/Country/Country.component';
import Img from '@/components/elems/Img/Img.component';

const TopAlbumCard: FC<TopAlbumCardPropsIF> = ({
    album,
    index,
    isWide = false,
    isActive = false,
    className = '',
    clickHandler,
}) => {
    const { position, title, year, artists, country, url } = album;
    const imgUrl = isWide ? (album.innerImg ?? album.coverImg) : album.coverImg;
    const heading = year ? `${title}, ${year}` : title;
    const wrapperClassName = `${styles.topAlbumCardWrapper} ${isActive ? styles.active : ''} ${className}`;

    const content = (
        <>
            <Img url={imgUrl} className={styles.img} />
            <Country value={country ?? undefined} className={styles.country} />
            <span className={styles.info}>
                <span className={`flc ${styles.position}`}>{position}</span>
                <span className={`flcol ${styles.text}`}>
                    <span className={styles.title}>{heading}</span>
                    {!!artists?.length && (
                        <span className={styles.artists}>
                            {artists.join(', ')}
                        </span>
                    )}
                </span>
            </span>
        </>
    );

    if (clickHandler) {
        return (
            <Button
                isCustom
                className={wrapperClassName}
                data-index={index}
                aria-pressed={isActive}
                aria-label={heading}
                clickHandler={clickHandler}
                dataTest={`top_album_${position}`}
            >
                {content}
            </Button>
        );
    }

    if (url) {
        return (
            <Link href={url} className={wrapperClassName} aria-label={heading}>
                {content}
            </Link>
        );
    }

    return <div className={wrapperClassName}>{content}</div>;
};

export default TopAlbumCard;
