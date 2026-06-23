import { FC } from 'react';
import Link from 'next/link';
import { CalendarArchiveTPLPropsIF } from '@/templates/CalendarArchiveTPL/CalendarArchiveTPL.types';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';

const CalendarArchiveTPL: FC<CalendarArchiveTPLPropsIF> = ({ data }) => (
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

export default CalendarArchiveTPL;
