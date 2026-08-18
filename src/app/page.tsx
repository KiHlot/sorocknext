import { getApi } from '@/store/functions';
import { PageProps } from '@/types/common';
import { HomePageDataIF } from '@/api/page/types';
import HomeTPL from '@/templates/HomeTPL/HomeTPL.component';

export async function generateMetadata({ params }: PageProps): any {
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

const Home = async () => {
    const homePageInfo = await getApi<HomePageDataIF>('/page/home-page-data');

    return <HomeTPL data={homePageInfo} />;
};

export default Home;
