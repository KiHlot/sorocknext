'use client';

import { FC, useState } from 'react';
import {
    IoCallOutline,
    IoLocationOutline,
    IoMailOutline,
    IoMapOutline,
    IoTimeOutline,
} from 'react-icons/io5';
import MainLogoSVG from '@/images/svg/svg_main_logo.svg';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/sections/AboutPromoSection/AboutBusinessCard/AboutBusinessCard.module.scss';
import { AboutBusinessCardPropsIF } from '@/components/sections/AboutPromoSection/AboutBusinessCard/AboutBusinessCard.types';
import { ABOUT_PROMO_COPY } from '@/components/sections/AboutPromoSection/AboutPromoSection.config';

const AboutBusinessCard: FC<AboutBusinessCardPropsIF> = ({
    data,
    className = '',
}) => {
    const [isMapOpen, setIsMapOpen] = useState(false);

    const handleToggleMap = (): void => {
        setIsMapOpen((current) => !current);
    };

    const mapLabel = isMapOpen
        ? ABOUT_PROMO_COPY.mapCloseLabel
        : ABOUT_PROMO_COPY.mapOpenLabel;

    return (
        <div
            className={`${styles.card} ${className}`}
            itemScope
            itemType="https://schema.org/LocalBusiness"
        >
            <div className={`${styles.map} ${isMapOpen ? styles.mapOpen : ''}`}>
                {isMapOpen ? (
                    <iframe
                        className={styles.iframe}
                        src={data.mapEmbedUrl}
                        title={ABOUT_PROMO_COPY.mapFrameTitle}
                    />
                ) : (
                    <IoMapOutline className={styles.mapIcon} aria-hidden />
                )}
                <Button
                    isCustom
                    type="button"
                    className={styles.mapButton}
                    clickHandler={handleToggleMap}
                    aria-label={mapLabel}
                    dataTest={ABOUT_PROMO_COPY.mapDataTest}
                >
                    {isMapOpen ? ABOUT_PROMO_COPY.mapCloseText : null}
                </Button>
            </div>
            <div className={styles.body}>
                <div className={styles.brand}>
                    <MainLogoSVG className={styles.logo} aria-hidden />
                    <span className={styles.name} itemProp="name">
                        {data.name}
                    </span>
                </div>
                <p className={styles.tagline}>
                    <span itemProp="description">{data.tagline}</span>{' '}
                    <a itemProp="url" href={data.siteUrl}>
                        {data.siteLabel}
                    </a>
                </p>
                <ul className={styles.rows}>
                    <li className={styles.row}>
                        <IoCallOutline className={styles.rowIcon} aria-hidden />
                        <a itemProp="telephone" href={data.phoneHref}>
                            {data.phone}
                        </a>
                    </li>
                    <li className={styles.row}>
                        <IoMailOutline className={styles.rowIcon} aria-hidden />
                        <a itemProp="email" href={`mailto:${data.email}`}>
                            {data.email}
                        </a>
                    </li>
                    <li className={styles.row}>
                        <IoLocationOutline
                            className={styles.rowIcon}
                            aria-hidden
                        />
                        <span
                            itemProp="address"
                            itemScope
                            itemType="https://schema.org/PostalAddress"
                        >
                            <span itemProp="streetAddress">{data.street}</span>
                            {', '}
                            <span itemProp="addressLocality">{data.city}</span>
                            {', '}
                            <span itemProp="addressCountry">
                                {data.country}
                            </span>
                            {', '}
                            <span itemProp="postalCode">
                                {data.postalCode}
                            </span>{' '}
                            <a
                                className={styles.mapLink}
                                href={data.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {ABOUT_PROMO_COPY.mapLinkLabel}
                            </a>
                        </span>
                    </li>
                    <li className={styles.row}>
                        <IoTimeOutline className={styles.rowIcon} aria-hidden />
                        <time
                            itemProp="openingHours"
                            dateTime={data.hoursDateTime}
                        >
                            {data.hours}
                        </time>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AboutBusinessCard;
