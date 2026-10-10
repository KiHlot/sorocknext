import { FC } from 'react';
import Link from 'next/link';
import { TAXONOMY_TERMS_TITLE_ID } from '@/components/widgets/TaxonomyTermsWidget/TaxonomyTermsWidget.config';
import styles from '@/components/widgets/TaxonomyTermsWidget/TaxonomyTermsWidget.module.scss';
import { TaxonomyTermsWidgetPropsIF } from '@/components/widgets/TaxonomyTermsWidget/TaxonomyTermsWidget.types';

const TaxonomyTermsWidget: FC<TaxonomyTermsWidgetPropsIF> = ({
    title,
    items,
}) => (
    <nav aria-labelledby={TAXONOMY_TERMS_TITLE_ID}>
        <h2 id={TAXONOMY_TERMS_TITLE_ID} className={styles.title}>
            {title}
        </h2>
        <ul className={styles.list}>
            {items.map((item) => (
                <li key={item.slug} className={styles.item}>
                    <Link
                        href={item.href}
                        className={styles.link}
                        aria-label={`${item.label}, ${item.count}`}
                    >
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.count}>{item.count}</span>
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);

export default TaxonomyTermsWidget;
