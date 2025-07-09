'use client';

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getArchiveLabel } from '@/components/interactive/Breadcrumbs/Breadcrumbs.config';
import styles from '@/components/interactive/Breadcrumbs/Breadcrumbs.module.scss';
import { BreadcrumbsPropsIF } from '@/components/interactive/Breadcrumbs/Breadcrumbs.types';

const Breadcrumbs: FC<BreadcrumbsPropsIF> = ({ className = '', title }) => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    return (
        <ul
            className={`${styles.breadcrumbsWrapper} ${className || ''}`}
            itemType="https://schema.org/BreadcrumbList"
            itemScope
        >
            <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
            >
                <Link href="/" itemProp="item">
                    <span itemProp="name">Главная</span>
                    <meta itemProp="position" content="1" />
                </Link>
            </li>

            {pathSegments.map((segment, index) => {
                const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSegments.length - 1;

                return (
                    <li
                        key={segment}
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                    >
                        &nbsp;»&nbsp;
                        {isLast ? (
                            <span>
                                <span itemProp="name">
                                    {getArchiveLabel(segment, title)}
                                </span>
                                <meta
                                    itemProp="position"
                                    content={(index + 2).toString()}
                                />
                            </span>
                        ) : (
                            <Link href={href} itemProp="item">
                                <span itemProp="name">
                                    {getArchiveLabel(segment, title)}
                                </span>
                                <meta
                                    itemProp="position"
                                    content={(index + 2).toString()}
                                />
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default Breadcrumbs;
