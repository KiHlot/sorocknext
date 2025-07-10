import { FC } from 'react';
import Link from 'next/link';
import { NewsArchiveTPLPropsIF } from '@/templates/NewsArchiveTPL/NewsArchiveTPL.types';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';

const NewsArchiveTPL: FC<NewsArchiveTPLPropsIF> = ({ data }) => {
    return (
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
};

export default NewsArchiveTPL;
