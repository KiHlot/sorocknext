import { EventCardModelIF } from '@/components/cards/EventCard/EventCard.types';

export interface RockDatesSectionPropsIF {
    data?: EventCardModelIF[] | null;
}

export interface RockDateMonthIF {
    id: string;
    index: number;
    label: string;
}

export interface RockDateDayIF {
    dateKey: string;
    weekdayLabel: string;
    weekdayShortLabel: string;
    dayLabel: string;
    monthLabel: string;
}
