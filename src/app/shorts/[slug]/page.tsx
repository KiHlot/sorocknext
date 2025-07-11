import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { getShortsSingleUrl } from '@/api/shorts/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';
import { ShortsIF } from '@/api/shorts/types';

const ShortsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<ShortsIF>(
            `${getShortsSingleUrl}/${slug}`,
        );

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch (error) {
        notFound();
    }
};

export default ShortsSingle;
