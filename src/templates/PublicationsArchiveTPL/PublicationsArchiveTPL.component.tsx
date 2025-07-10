import { FC } from 'react';
import Link from 'next/link';
import { PublicationsArchiveTPLPropsIF } from '@/templates/PublicationsArchiveTPL/PublicationsArchiveTPL.types';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';

const PublicationsArchiveTPL: FC<PublicationsArchiveTPLPropsIF> = ({ data }) => {
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

export default PublicationsArchiveTPL;
