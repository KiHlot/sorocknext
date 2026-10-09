import { HTMLString } from '@/types/common';
import { LastNewsPromoCardModelIF } from '@/components/cards/LastNewsPromoCard/LastNewsPromoCard.types';

export interface LastNewsPromoAchievementIF {
    value: string;
    label: string;
}

export interface LastNewsPromoPromoDataIF {
    titleH1: string;
    description: HTMLString;
    achievementsList: LastNewsPromoAchievementIF[] | null;
}

export interface LastNewsPromoDataIF {
    promoData: LastNewsPromoPromoDataIF | null;
    lastNews: LastNewsPromoCardModelIF[] | null;
}

export interface LastNewsPromoSectionPropsIF {
    lastNewsPromoData?: LastNewsPromoDataIF | null;
}
