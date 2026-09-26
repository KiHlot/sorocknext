import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';

export const ROCK_DATES_MONTH_SLIDES_PER_VIEW = 1;

export const ROCK_DATES_MONTH_BREAKPOINTS = {
    [MAGIC_NUMBERS.BreakpointSm + 1]: {
        slidesPerView: MAGIC_NUMBERS.RockDatesMonthsPerViewXxl,
    },
    [MAGIC_NUMBERS.BreakpointXxl + 1]: {
        slidesPerView: MAGIC_NUMBERS.RockDatesMonthsPerView,
    },
};

export const ROCK_DATES_DAY_BREAKPOINTS = {
    [MAGIC_NUMBERS.BreakpointSm + 1]: {
        slidesPerView: MAGIC_NUMBERS.RockDatesDaysPerViewMd,
    },
    [MAGIC_NUMBERS.BreakpointMd + 1]: {
        slidesPerView: MAGIC_NUMBERS.RockDatesDaysPerView,
    },
};

export const ROCK_DATES_LABELS = {
    section: 'Рок-даты',
    months: 'Месяцы',
    days: 'Дни месяца',
    prevMonth: 'Предыдущий месяц',
    nextMonth: 'Следующий месяц',
    prevDay: 'Предыдущий день',
    nextDay: 'Следующий день',
    emptyDay: 'В этот день событий нет',
} as const;
