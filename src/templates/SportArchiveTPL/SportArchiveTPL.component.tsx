import { FC } from 'react';
import Link from 'next/link';
import {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import { SportArchiveTPLPropsIF } from '@/templates/SportArchiveTPL/SportArchiveTPL.types';

const SportArchiveTPL: FC<SportArchiveTPLPropsIF> = ({ data }) => (
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

export default SportArchiveTPL;
