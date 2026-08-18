import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getApi } from '@/store/functions';
import { PageProps } from '@/types/common';
import { SeoData } from '@/types/post';
import { NewsIF } from '@/api/news/types';
import { getNewsMetadataUrl, getNewsSingleUrl } from '@/api/news/urls';
import { setSeo } from '@/helpers/seo';
import PostTPL from '@/templates/PostTPL/PostTPL.component';

export const generateMetadata = async ({
    params,
}: PageProps): Promise<Metadata> => {
    const { slug } = await params;

    const data = await getApi<SeoData>(`${getNewsMetadataUrl}/${slug}`);

    return await setSeo(data);
};

const NewsSingle = async ({ params }: PageProps): any => {
    const { slug } = await params;

    try {
        const data = await getApi<NewsIF>(`${getNewsSingleUrl}/${slug}`);

        if (!data) {
            console.log('page404');
            return slug;
            // notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        console.log('page404');
        // notFound();
    }
};

export default NewsSingle;
