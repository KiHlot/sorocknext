import { FC } from 'react';
import Link from 'next/link';
import styles from '@/components/elems/Author/Author.module.scss';
import { AuthorPropsIF } from '@/components/elems/Author/Author.types';
import Img from '@/components/elems/Img/Img.component';

const Author: FC<AuthorPropsIF> = ({ data, type = 'full', className = '' }) => {
    return data?.url ? (
        <Link
            href={data.url}
            className={`${styles.authorWrapper} ${className}`}
        >
            {type === 'full' && <Img url={data.img80} />}
            <span className={styles.name}>{data.fullName}</span>
        </Link>
    ) : null;
};

export default Author;
