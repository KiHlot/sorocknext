import { Metadata, SeoData } from '@/types/post';
import ogimg from '@/images/img/ogimg.jpg';

export const setSeo = (seoData?: SeoData | null): Metadata => {
    const data = {
        title: 'Sorock - Музыкальный портал',
        description: 'Новости, события и музыкальная культура на sorock.ru',
        canonical: 'https://sorock.ru',
        dateGmt: '',
        modifiedGmt: '',
        tags: ['события', 'музыка', 'новости'],
        author: 'SoRock Админ',
        innerImg: ogimg.src,
        ...seoData,
    };

    return {
        metadataBase: new URL('https://sorock.ru'),
        title: data.title,
        description: data.description,
        alternates: {
            canonical: data.canonical,
        },
        openGraph: {
            title: data.title,
            description: data.description,
            url: data.canonical,
            images: [{ url: data.innerImg }],
            type: 'article',
            publishedTime: data.dateGmt,
            modifiedTime: data.modifiedGmt,
            authors: [data.author],
            tags: data.tags?.join(','),
            locale: 'ru_RU',
            siteName: 'Музыкальный портал sorock.ru',
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
            images: data.innerImg ? [data.innerImg] : undefined,
        },
        verification: {
            yandex: '888427e5981495e7',
        },
        other: {
            'article:publisher': 'https://vk.com/spirit_rock_culture',
        },
    };
};
