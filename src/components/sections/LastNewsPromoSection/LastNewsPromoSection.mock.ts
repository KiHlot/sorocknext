import { DateWithTimeT } from '@/types/common';
import { AuthorIF } from '@/types/post';

export interface LastNewsPromoCardIF {
    title: string;
    url: string;
    innerImg: string;
    postDate: DateWithTimeT;
    country: string;
    readingTime: number;
    author: AuthorIF | null;
}

export const LAST_NEWS_PROMO_MOCK: LastNewsPromoCardIF[] = [
    {
        title: 'Pink Floyd открыли редкий концерт 1972 года',
        url: '/news/pink-floyd-1972',
        innerImg: '',
        postDate: '2026-10-09 18:40:00',
        country: 'gb',
        readingTime: 6,
        author: { fullName: 'Анна Крылова', img80: null },
    },
    {
        title: 'Radiohead назвали дату весеннего альбома',
        url: '/news/radiohead-spring-album',
        innerImg: '',
        postDate: '2026-10-09 14:15:00',
        country: 'gb',
        readingTime: 4,
        author: { fullName: 'Илья Морозов', img80: null },
    },
    {
        title: 'Metallica объявили стадионный тур по Европе',
        url: '/news/metallica-europe-tour',
        innerImg: '',
        postDate: '2026-10-08 21:05:00',
        country: 'us',
        readingTime: 5,
        author: { fullName: 'Мария Лебедева', img80: null },
    },
    {
        title: 'Архив Nirvana открыли для прослушивания',
        url: '/news/nirvana-archive',
        innerImg: '',
        postDate: '2026-10-08 11:20:00',
        country: 'us',
        readingTime: 3,
        author: null,
    },
    {
        title: 'Фестиваль в Гластонбери назвал хедлайнеров',
        url: '/news/glastonbury-headliners',
        innerImg: '',
        postDate: '2026-10-07 16:50:00',
        country: 'gb',
        readingTime: 7,
        author: { fullName: 'Павел Орлов', img80: null },
    },
];
