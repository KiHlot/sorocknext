import { FC } from 'react';
import {
    IoCalendarOutline,
    IoPersonOutline,
    IoTimerOutline,
} from 'react-icons/io5';
import { SITE_CATEGORIES } from '@/configs/siteCategories/siteCategories.config';
import { formatDate } from '@/helpers/utils';
import Author from '@/components/elems/Author/Author.component';
import CategoryLink from '@/components/elems/CategoryLink/CategoryLink.component';
import Country from '@/components/elems/Country/Country.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import {
    getPromoCategories,
    getPromoTags,
} from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.helpers';
import styles from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.module.scss';
import { SinglePostPromoSectionPropsIF } from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.types';

const SinglePostPromoSection: FC<SinglePostPromoSectionPropsIF> = ({
    postBase,
    pathname,
}) => {
    const { main, country, settings, innerImg, author, taxonomies } = postBase;
    const categories = getPromoCategories(taxonomies?.categories);
    const tags = getPromoTags(taxonomies?.tags);
    const title = main?.titleH1?.trim();
    const coverUrl = innerImg?.trim();
    const publishedAt = formatDate(main?.postDate);
    const readingMinutes = Number(settings?.readingTime);
    const hasReadingTime =
        Number.isFinite(readingMinutes) && readingMinutes > 0;
    const authorName = author?.fullName?.trim();
    const countryCode = country?.trim();
    const hasMeta = Boolean(publishedAt || hasReadingTime || authorName);

    if (!title) {
        return null;
    }

    return (
        <header className={`flcol ${styles.singlePostPromoSectionWrapper}`}>
            {coverUrl && (
                <div
                    className={`bgc ${styles.bg}`}
                    style={{
                        backgroundImage: `linear-gradient(to left, rgba(40, 48, 57, 0.6), rgba(40, 48, 57, 1)), url(${coverUrl})`,
                    }}
                    aria-hidden="true"
                />
            )}
            <Breadcrumbs
                pathname={pathname}
                title={main.titleSeo?.trim() || title}
            />
            <div className={`flcol ${styles.heading}`}>
                <h1 className={styles.title} itemProp="headline">
                    {title}
                </h1>
                {categories.length > 0 && (
                    <ul className={styles.categories} aria-label="Категории">
                        {categories.map((slug) =>
                            slug in SITE_CATEGORIES ? (
                                <li key={slug}>
                                    <CategoryLink
                                        categorySLug={slug}
                                        linkType="small"
                                    />
                                </li>
                            ) : (
                                <li key={slug}>{slug}</li>
                            ),
                        )}
                    </ul>
                )}
                {tags.length > 0 && (
                    <ul className={styles.tags} aria-label="Теги">
                        {tags.map((tag) => (
                            <li key={tag.value} className={styles.tag}>
                                #{tag.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {(hasMeta || countryCode) && (
                <div className={styles.perks}>
                    {hasMeta && (
                        <ul aria-label="Сведения о публикации">
                            {publishedAt && (
                                <li>
                                    <time
                                        dateTime={main.postDate
                                            ?.trim()
                                            .replace(' ', 'T')}
                                        itemProp="datePublished"
                                    >
                                        <IoCalendarOutline aria-hidden="true" />
                                        <span className={styles.metaLabel}>
                                            Дата публикации:
                                        </span>
                                        {publishedAt}
                                    </time>
                                </li>
                            )}
                            {hasReadingTime && (
                                <li>
                                    <IoTimerOutline aria-hidden="true" />
                                    <span className={styles.metaLabel}>
                                        Время на прочтение:
                                    </span>
                                    {readingMinutes} мин.
                                </li>
                            )}
                            {authorName && (
                                <li>
                                    <IoPersonOutline aria-hidden="true" />
                                    <span className={styles.metaLabel}>
                                        Автор:
                                    </span>
                                    <Author data={author} type="name" />
                                </li>
                            )}
                        </ul>
                    )}
                    <Country value={countryCode} className={styles.country} />
                </div>
            )}
        </header>
    );
};

export default SinglePostPromoSection;
