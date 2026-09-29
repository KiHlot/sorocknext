import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/cards/TopAlbomCard/TopAlbomCard.module.scss';
import { TopAlbomCardPropsIF } from '@/components/cards/TopAlbomCard/TopAlbomCard.types';
import Button from '@/components/controls/Button/Button.component';
import Country from '@/components/elems/Country/Country.component';
import Img from '@/components/elems/Img/Img.component';

const TopAlbomCard: FC<TopAlbomCardPropsIF> = ({
    albom,
    index,
    isWide = false,
    isActive = false,
    className = '',
    clickHandler,
}) => {
    const { position, title, year, artists, country, url, musicCode } = albom;
    const imgUrl = isWide ? (albom.innerImg ?? albom.coverImg) : albom.coverImg;
    const heading = year ? `${title}, ${year}` : title;
    const wrapperClassName = `${styles.topAlbomCardWrapper} ${isActive ? styles.active : ''} ${className}`;

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

    if (musicCode && clickHandler) {
        return (
            <Button
                isCustom
                className={wrapperClassName}
                data-index={index}
                aria-pressed={isActive}
                aria-label={heading}
                clickHandler={clickHandler}
                dataTest={`top_albom_${position}`}
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

export default TopAlbomCard;
