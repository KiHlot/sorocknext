import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/elems/Author/Author.module.scss';
import { AuthorPropsIF } from '@/components/elems/Author/Author.types';
import empty_user_80_80 from '@/images/img/empty_user_80_80.png';

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
                        backgroundImage: `url(${data.img80 || empty_user_80_80})`,
                    }}
                />
            )}
            <span className={styles.name}>{data.fullName}</span>
        </Link>
    ) : null;
};

export default Author;
