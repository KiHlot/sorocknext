import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';
import { getNewsSingleUrl } from '@/api/news/urls';
import { NewsIF } from '@/api/news/types';

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;

    // const product = await fetchProduct(params.id);

    const product = {
        name: 'name',
        price: 'price',
        shortDescription: 'shortDescription',
    };

    return {
        title: `${product.name} — купить за ${product.price} руб.`,
        description: `${product.name}. ${product.shortDescription}. Доставка по России.`,
        alternates: {
            canonical: `https://sorock.ru/product/${slug}`,
        },
        // openGraph: {
        //     images: product.images,
        // }
    };
}

const NewsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<NewsIF>(`${getNewsSingleUrl}/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch (error) {
        notFound();
    }
};

export default NewsSingle;
