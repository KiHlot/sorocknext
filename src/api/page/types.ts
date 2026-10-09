import { EventCardModelIF } from '@/components/cards/EventCard/EventCard.types';
import { LastNewsPromoDataIF } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.types';
import { TopAlbumsListIF } from '@/components/sections/TopAlbumsSection/TopAlbumsSection.types';

export interface HomePageDataIF {
    lastNewsPromoData?: LastNewsPromoDataIF | null;
    calendarDefaultData?: EventCardModelIF[] | null;
    topAlbumsListData?: TopAlbumsListIF[] | null;
}
