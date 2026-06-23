import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { MusicIF } from '@/api/music/types';
import { getMusicSingleUrl } from '@/api/music/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const MusicSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<MusicIF>(`${getMusicSingleUrl}/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
};

export default MusicSingle;
