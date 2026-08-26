import { FC } from 'react';
import Link from 'next/link';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import { NewsArchiveTPLPropsIF } from '@/templates/NewsArchiveTPL/NewsArchiveTPL.types';

const NewsArchiveTPL: FC<NewsArchiveTPLPropsIF> = ({ data }) => (
    <CommonLayout>
        <Content>
            <Breadcrumbs />
            <div className="flcol gapBlock">
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

export default NewsArchiveTPL;
