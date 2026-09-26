export interface RockDateEventIF {
    id: string;
    monthDay: string;
    title: string;
    text: string;
}

export interface RockDateMonthIF {
    id: string;
    index: number;
    label: string;
}

export interface RockDateDayIF {
    dateKey: string;
    weekdayLabel: string;
    dayLabel: string;
    monthLabel: string;
    hasEvents: boolean;
}
