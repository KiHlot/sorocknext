import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';

export const LAST_NEWS_PROMO_SLIDES_PER_VIEW = 1.5;

export const LAST_NEWS_PROMO_SLIDER_BREAKPOINTS = {
    [MAGIC_NUMBERS.BreakpointMd + 1]: {
        slidesPerView: LAST_NEWS_PROMO_SLIDES_PER_VIEW,
    },
} as const;

export const LAST_NEWS_PROMO_COPY = {
    titleId: 'last-news-promo-title',
    titleLead: 'Свежие',
    titleAccent: 'новости',
    titleTail: 'рок-сцены.',
    lead: 'Материалы, интервью и события со всего мира. Коротко о том, что важно сегодня.',
    ctaLabel: 'К новостям',
    ctaHref: '/news',
    sliderLabel: 'Последние новости',
    dotsLabel: 'Слайды новостей',
    stats: [
        { id: 'materials', value: '32K+', label: 'Материалов' },
        { id: 'authors', value: '20K+', label: 'Авторов' },
        { id: 'countries', value: '10K+', label: 'Стран' },
    ],
} as const;

export const getLastNewsPromoSlideLabel = (
    index: number,
    total: number,
): string => `Новость ${index + 1} из ${total}`;
