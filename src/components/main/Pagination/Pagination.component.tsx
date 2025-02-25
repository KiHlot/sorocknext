import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { createPaginationData } from '@/components/main/Pagination/Pagination.config';
import styles from '@/components/main/Pagination/Pagination.module.scss';
import { PaginationPropsIF } from '@/components/main/Pagination/Pagination.types';
import { PaginationButtonIF } from '@/components/main/Pagination/PaginationButton/PaginationButton.types';

const Pagination: FC<PaginationPropsIF> = ({ pagination }) => {
    const [normalizedPagination, setNormalizedPagination] = useState<Record<
        string,
        PaginationButtonIF[]
    > | null>(null);

    useEffect(() => {
        setNormalizedPagination(
            pagination?.pagesCount && pagination.pagesCount > 1
                ? createPaginationData(pagination?.page, pagination?.pagesCount)
                : null,
        );
    }, [pagination]);

    return normalizedPagination ? (
        <nav className={styles.paginationWrapper} role="pagination">
            {Object.entries(normalizedPagination).map(
                ([key, paginationData], index) => (
                    <div key={key} className={`flc ${styles.paginationBlock}`}>
                        {paginationData.map(({ label, isCurrent }) => (
                            //TODO pagination
                            <Link
                                key={label}
                                href={`?page=${label}`}
                                className={`flc ${styles.paginationButton} ${isCurrent ? styles.current : ''}`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>
                ),
            )}
        </nav>
    ) : null;
};

export default Pagination;
