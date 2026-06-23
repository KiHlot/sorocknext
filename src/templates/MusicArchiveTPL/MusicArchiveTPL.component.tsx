import { FC } from 'react';
import Link from 'next/link';
import { MusicArchiveTPLPropsIF } from '@/templates/MusicArchiveTPL/MusicArchiveTPL.types';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';

const MusicArchiveTPL: FC<MusicArchiveTPLPropsIF> = ({ data }) => (
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

export default MusicArchiveTPL;
