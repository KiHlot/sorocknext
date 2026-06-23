import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { SeoData } from '@/types/post';
import { NewsIF } from '@/api/news/types';
import { getNewsMetadataUrl, getNewsSingleUrl } from '@/api/news/urls';
import { setSeo } from '@/helpers/seo';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

export const generateMetadata = async ({ params }: PageProps) => {
    const { slug } = await params;

    const data = await getApi<SeoData>(`${getNewsMetadataUrl}/${slug}`);

    return await setSeo(data);
};

const NewsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<NewsIF>(`${getNewsSingleUrl}/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
};

export default NewsSingle;
