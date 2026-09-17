import { FC } from 'react';
import Link from 'next/link';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { getArchiveLabel } from '@/components/interactive/Breadcrumbs/Breadcrumbs.config';
import styles from '@/components/interactive/Breadcrumbs/Breadcrumbs.module.scss';
import { BreadcrumbsPropsIF } from '@/components/interactive/Breadcrumbs/Breadcrumbs.types';

const Breadcrumbs: FC<BreadcrumbsPropsIF> = ({
    className = '',
    pathname,
    title,
}) => {
    const isHome = pathname === '/';

    return (
        <nav
            aria-label="Хлебные крошки"
            className={`${styles.nav} ${className}`}
            itemScope
            itemType="https://schema.org/BreadcrumbList"
        >
            <ol className={styles.list}>
                <li
                    className={styles.item}
                    itemProp="itemListElement"
                    itemScope
                    itemType="https://schema.org/ListItem"
                    aria-current={isHome ? 'page' : undefined}
                >
                    {isHome ? (
                        <span itemProp="name">Главная</span>
                    ) : (
                        <Link href="/" itemProp="item">
                            <span itemProp="name">Главная</span>
                        </Link>
                    )}
                    <meta
                        itemProp="position"
                        content={`${MAGIC_NUMBERS.BreadcrumbHomePosition}`}
                    />
                </li>
                {pathname
                    .split('/')
                    .filter(Boolean)
                    .map((segment, index, pathSegments) => {
                        const href = `/${pathSegments
                            .slice(0, index + 1)
                            .join('/')}`;
                        const isLast = index === pathSegments.length - 1;
                        const label = getArchiveLabel(segment, title);

                        return (
                            <li
                                key={href}
                                className={styles.item}
                                itemProp="itemListElement"
                                itemScope
                                itemType="https://schema.org/ListItem"
                                aria-current={isLast ? 'page' : undefined}
                            >
                                <span className={styles.separator} aria-hidden>
                                    {' » '}
                                </span>
                                {isLast ? (
                                    <span itemProp="name">{label}</span>
                                ) : (
                                    <Link href={href} itemProp="item">
                                        <span itemProp="name">{label}</span>
                                    </Link>
                                )}
                                <meta
                                    itemProp="position"
                                    content={`${
                                        index +
                                        MAGIC_NUMBERS.BreadcrumbPathPositionOffset
                                    }`}
                                />
                            </li>
                        );
                    })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
