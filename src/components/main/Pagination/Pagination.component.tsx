import { FC, useMemo } from 'react';
import Link from 'next/link';
import { createPaginationData } from '@/components/main/Pagination/Pagination.config';
import styles from '@/components/main/Pagination/Pagination.module.scss';
import { PaginationPropsIF } from '@/components/main/Pagination/Pagination.types';

const Pagination: FC<PaginationPropsIF> = ({ pagination }) => {
    const normalizedPagination = useMemo(() => {
        return pagination?.pagesCount && pagination.pagesCount > 1
            ? createPaginationData(pagination.page, pagination.pagesCount)
            : null;
    }, [pagination]);

    console.log('pagination', pagination)
    console.log('normalizedPagination', normalizedPagination)
    
    return normalizedPagination ? (
        <nav className={styles.paginationWrapper} role="pagination">
            {Object.entries(normalizedPagination).map(
                ([key, paginationData], index) => {
                    return paginationData?.length ? (
                        <>
                            {index !== 0 &&
                                index < paginationData.length + 1 && (
                                    <span>...</span>
                                )}
                            <div
                                key={key}
                                className={`flc ${styles.paginationBlock}`}
                            >
                                {paginationData.map(({ label, isCurrent }) =>
                                    isCurrent ? (
                                        <span
                                            key={label}
                                            className={`flc ${styles.paginationButton} ${styles.current}`}
                                        >
                                            {label}
                                        </span>
                                    ) : (
                                        <Link
                                            key={label}
                                            href={`?page=${label}`}
                                            className={`flc ${styles.paginationButton} ${isCurrent ? styles.current : ''}`}
                                        >
                                            {label}
                                        </Link>
                                    ),
                                )}
                            </div>
                        </>
                    ) : null;
                },
            )}
        </nav>
    ) : null;
};

export default Pagination;
