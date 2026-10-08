import { FC, Fragment } from 'react';
import Link from 'next/link';
import { createPaginationData } from '@/components/interactive/Pagination/Pagination.config';
import styles from '@/components/interactive/Pagination/Pagination.module.scss';
import { PaginationPropsIF } from '@/components/interactive/Pagination/Pagination.types';

const Pagination: FC<PaginationPropsIF> = ({ pagination, getPageHref }) => {
    if (!pagination?.pagesCount || pagination.pagesCount <= 1) {
        return null;
    }

    const paginationBlocks = createPaginationData(
        pagination.page,
        pagination.pagesCount,
    );

    return (
        <nav className={styles.paginationWrapper} aria-label="Пагинация">
            {paginationBlocks.map((paginationData, index) => (
                <Fragment key={paginationData.at(0)?.label}>
                    {index > 0 && (
                        <span className={styles.separator} aria-hidden="true">
                            …
                        </span>
                    )}
                    <div className={`flc ${styles.paginationBlock}`}>
                        {paginationData.map(({ label, isCurrent }) =>
                            isCurrent ? (
                                <span
                                    key={label}
                                    className={`flc ${styles.paginationButton} ${styles.current}`}
                                    aria-current="page"
                                >
                                    {label}
                                </span>
                            ) : (
                                <Link
                                    key={label}
                                    href={
                                        getPageHref?.(label) ?? `?page=${label}`
                                    }
                                    className={`flc ${styles.paginationButton}`}
                                    aria-label={`Страница ${label}`}
                                >
                                    {label}
                                </Link>
                            ),
                        )}
                    </div>
                </Fragment>
            ))}
        </nav>
    );
};

export default Pagination;
