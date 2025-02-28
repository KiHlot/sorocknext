import { FC } from 'react';
import Link from 'next/link';
import { normalizeImage } from '@/helpers/utils';
import styles from '@/components/elems/Author/Author.module.scss';
import { AuthorPropsIF } from '@/components/elems/Author/Author.types';

const Author: FC<AuthorPropsIF> = ({ data, type = 'full', className = '' }) => {
    return data ? (
        <Link
            href={data.url}
            className={`${styles.authorWrapper} ${className}`}
        >
            {type === 'full' && (
                <span
                    className={styles.thumb}
                    style={{
                        backgroundImage: `url(${normalizeImage(data.img80, 'user80')})`,
                    }}
                />
            )}
            <span className={styles.name}>{data.fullName}</span>
        </Link>
    ) : null;
};

export default Author;
