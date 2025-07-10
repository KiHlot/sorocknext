import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';
import { getMusicSingleUrl } from '@/api/music/urls';
import { MusicSingleIF } from '@/api/music/types';

const MusicSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<MusicSingleIF>(
            `${getMusicSingleUrl}/${slug}`,
        );

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch (error) {
        notFound();
    }
};

export default MusicSingle;
