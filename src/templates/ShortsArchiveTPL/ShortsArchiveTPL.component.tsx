import { FC } from 'react';
import Link from 'next/link';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import { ShortsArchiveTPLPropsIF } from '@/templates/ShortsArchiveTPL/ShortsArchiveTPL.types';

const ShortsArchiveTPL: FC<ShortsArchiveTPLPropsIF> = ({ data }) => (
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

export default ShortsArchiveTPL;
