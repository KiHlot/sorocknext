import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { VideoIF } from '@/api/video/types';
import { getVideoSingleUrl } from '@/api/video/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const VideoSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<VideoIF>(`${getVideoSingleUrl}/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
};

export default VideoSingle;
