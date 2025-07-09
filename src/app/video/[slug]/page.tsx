import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { VideoSingleIF } from '@/api/video/types';
import { getVideoSingleUrl } from '@/api/video/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const VideoSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<VideoSingleIF>(
            `${getVideoSingleUrl}/${slug}`,
        );

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch (error) {
        notFound();
    }
};

export default VideoSingle;
