import { PromoSectionIF } from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.types';
import { HTMLString } from '@/types/common';

export interface NewsSingleTPLPropsIF {
    data?: {
        promoSection: PromoSectionIF | null;
        content: HTMLString;
    };
}
