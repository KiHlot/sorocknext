import { FC } from 'react';
import Link from 'next/link';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import { MusicArchiveTPLPropsIF } from '@/templates/MusicArchiveTPL/MusicArchiveTPL.types';

const MusicArchiveTPL: FC<MusicArchiveTPLPropsIF> = ({ data }) => (
    <>
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
    </>
);

export default MusicArchiveTPL;
