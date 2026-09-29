import { EventCardModelIF } from '@/components/cards/EventCard/EventCard.types';
import { LastNewsPromoDataIF } from '@/components/sections/LastNewsPromoSection/LastNewsPromoSection.types';
import { TopAlbomsListIF } from '@/components/sections/TopAlbomsSection/TopAlbomsSection.types';

export interface HomePageDataIF {
    lastNewsPromoData?: LastNewsPromoDataIF[] | null;
    calendarDefaultData?: EventCardModelIF[] | null;
    topAlbomsListData?: TopAlbomsListIF[] | null;
}
