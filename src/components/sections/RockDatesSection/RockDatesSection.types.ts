export interface RockDateEventIF {
    id: string;
    monthDay: string;
    title: string;
    text: string;
    authorName: string;
    tags: string[];
    country: string;
    cover: string;
    url: string;
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
    hasEvents: boolean;
}
