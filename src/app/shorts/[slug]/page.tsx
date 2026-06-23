import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { ShortsIF } from '@/api/shorts/types';
import { getShortsSingleUrl } from '@/api/shorts/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const ShortsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<ShortsIF>(`${getShortsSingleUrl}/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
};

export default ShortsSingle;
