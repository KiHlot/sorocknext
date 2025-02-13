import { FC } from 'react';
import Link from 'next/link';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/elems/Breadcrumbs/Breadcrumbs.component';
import styles from '@/templates/NewsTPL/NewsTPL.module.scss';
import { NewsTPLPropsIF } from '@/templates/NewsTPL/NewsTPL.types';

const NewsTPL: FC<NewsTPLPropsIF> = ({ data }) => {
    return (
        <CommonLayout>
            <Content className={styles.newsTPLWrapper}>
                <Breadcrumbs />
                <div>
                    {data?.defaultData.map(({ url, label }) => (
                        <Link key={url} href={url}>
                            {label}
                        </Link>
                    ))}
                </div>
            </Content>
            <Sidebar>sidebar</Sidebar>
        </CommonLayout>
    );
};

export default NewsTPL;
