export const TODAY_ROCK_DATES_TITLE_ID = 'today-rock-dates-title';

export const TODAY_ROCK_DATES_COPY = {
    title: 'Рок даты сегодня',
    dotsLabel: 'Слайды рок-дат',
} as const;

export const getTodayRockDateSlideLabel = (
    index: number,
    total: number,
): string => `Рок дата ${index + 1} из ${total}`;
