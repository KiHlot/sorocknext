import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { getShortsSingleUrl } from '@/api/shorts/urls';
import { ShortsSingleIF } from '@/api/sport/types';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const ShortsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<ShortsSingleIF>(
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
