import { FC } from 'react';
import Link from 'next/link';
import styles from '@/templates/NewsTPL/NewsTPL.module.scss';
import { NewsTPLPropsIF } from '@/templates/NewsTPL/NewsTPL.types';

const NewsTPL: FC<NewsTPLPropsIF> = ({ data }) => {
    return (
        <div className={styles.newsTPLWrapper}>
            {data?.defaultData.map(({ url, label }) => (
                <Link key={url} href={url}>
                    {label}
                </Link>
            ))}
        </div>
    );
};

export default NewsTPL;
