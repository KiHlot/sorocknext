import { FC } from 'react';
import Link from 'next/link';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import { VideoArchiveTPLPropsIF } from '@/templates/VideoArchiveTPL/VideoArchiveTPL.types';

const VideoArchiveTPL: FC<VideoArchiveTPLPropsIF> = ({ data }) => {
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

export default VideoArchiveTPL;
