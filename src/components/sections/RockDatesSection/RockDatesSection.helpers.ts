import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import {
    ROCK_DATES_FEBRUARY_MONTH_INDEX,
    ROCK_DATES_LABELS,
    ROCK_DATES_LEAP_DAY_KEY,
} from '@/components/sections/RockDatesSection/RockDatesSection.config';
import { ROCK_DATE_EVENTS } from '@/components/sections/RockDatesSection/RockDatesSection.mock';
import {
    RockDateDayIF,
    RockDateEventIF,
    RockDateMonthIF,
} from '@/components/sections/RockDatesSection/RockDatesSection.types';

const eventsByMonthDay: Record<string, RockDateEventIF[]> = {};

for (const event of ROCK_DATE_EVENTS) {
    const current = eventsByMonthDay[event.monthDay] ?? [];

    eventsByMonthDay[event.monthDay] = [...current, event];
}

export const getMonthStart = (year: number, monthIndex: number): Dayjs =>
    dayjs(`${year}-01-01`).add(monthIndex, 'month').startOf('day');

export const yearHasLeapDay = (year: number): boolean =>
    dayjs(`${year}-02-01`).daysInMonth() === MAGIC_NUMBERS.LeapDay;

export const getEventsForDate = (date: Dayjs): RockDateEventIF[] => {
    const monthDay = date.format(TIME_FORMATS.MonthDay);
    const ownEvents = eventsByMonthDay[monthDay] ?? [];
    // В невисокосном году 29 февраля нет: эти события показываем 28-го.
    const shouldTransferLeapDay =
        date.month() === ROCK_DATES_FEBRUARY_MONTH_INDEX &&
        date.date() === MAGIC_NUMBERS.FebruaryFallbackDay &&
        !yearHasLeapDay(date.year());

    if (!shouldTransferLeapDay) {
        return ownEvents;
    }

    const transferredEvents = eventsByMonthDay[ROCK_DATES_LEAP_DAY_KEY] ?? [];

    return [...ownEvents, ...transferredEvents];
};

export const getFirstDateWithEvents = (monthStart: Dayjs): Dayjs => {
    const daysInMonth = monthStart.daysInMonth();

    for (let dayIndex = 0; dayIndex < daysInMonth; dayIndex += 1) {
        const date = monthStart.add(dayIndex, 'day');

        if (getEventsForDate(date).length > 0) {
            return date.startOf('day');
        }
    }

    return monthStart.startOf('day');
};

export const getYearMonths = (year: number): RockDateMonthIF[] =>
    Array.from({ length: MAGIC_NUMBERS.MonthsInYear }, (_, monthIndex) => {
        const date = getMonthStart(year, monthIndex).locale('ru');

        return {
            id: date.format(TIME_FORMATS.YearMonth),
            index: monthIndex,
            label: date.format(TIME_FORMATS.MonthName),
        };
    });

export const getMonthDays = (monthDate: Dayjs): RockDateDayIF[] => {
    const monthStart = getMonthStart(monthDate.year(), monthDate.month());
    const daysInMonth = monthStart.daysInMonth();

    return Array.from({ length: daysInMonth }, (_, dayIndex) => {
        const date = monthStart.add(dayIndex, 'day').locale('ru');
        const hasEvents = getEventsForDate(date).length > 0;

        return {
            dateKey: date.format(TIME_FORMATS.DateIso),
            weekdayLabel: date.format(TIME_FORMATS.WeekdayName),
            dayLabel: hasEvents
                ? date.format(TIME_FORMATS.DayOfMonth)
                : ROCK_DATES_LABELS.noEvents,
            monthLabel: date.format(TIME_FORMATS.MonthShort),
            hasEvents,
        };
    });
};
