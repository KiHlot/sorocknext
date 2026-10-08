import { FC } from 'react';
import Link from 'next/link';
import { ARCHIVE_TERM_FILTER_LABEL } from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.config';
import styles from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.module.scss';
import { ArchiveTermFilterPropsIF } from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.types';

const ArchiveTermFilter: FC<ArchiveTermFilterPropsIF> = ({
    items,
    activeSlug,
}) => {
    const currentSlug = activeSlug ?? '';

    return (
        <nav className={styles.filter} aria-label={ARCHIVE_TERM_FILTER_LABEL}>
            {items.map((item) => {
                const isCurrent = item.slug === currentSlug;

                return (
                    <Link
                        key={item.slug || item.href}
                        href={item.href}
                        className={`flc ${styles.link} ${isCurrent ? styles.current : ''}`}
                        aria-current={isCurrent ? 'page' : undefined}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
};

export default ArchiveTermFilter;
