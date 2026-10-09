import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';

export const LAST_NEWS_PROMO_SLIDE_GAP = MAGIC_NUMBERS.LastNewsPromoSlideGap;

export const LAST_NEWS_PROMO_SLIDES_PER_VIEW = 1.5;

export const LAST_NEWS_PROMO_SLIDER_BREAKPOINTS = {
    [MAGIC_NUMBERS.BreakpointMd + 1]: {
        slidesPerView: LAST_NEWS_PROMO_SLIDES_PER_VIEW,
    },
} as const;

export const LAST_NEWS_PROMO_COPY = {
    titleId: 'last-news-promo-title',
    sliderLabel: 'Последние новости',
    dotsLabel: 'Слайды новостей',
} as const;

export const getLastNewsPromoSlideLabel = (
    index: number,
    total: number,
): string => `Новость ${index + 1} из ${total}`;
