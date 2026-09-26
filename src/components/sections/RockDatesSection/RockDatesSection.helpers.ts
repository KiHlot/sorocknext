import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import {
    RockDateDayIF,
    RockDateMonthIF,
} from '@/components/sections/RockDatesSection/RockDatesSection.types';

export const getMonthStart = (year: number, monthIndex: number): Dayjs =>
    dayjs(`${year}-01-01`).add(monthIndex, 'month').startOf('day');

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

        return {
            dateKey: date.format(TIME_FORMATS.DateIso),
            weekdayLabel: date.format(TIME_FORMATS.WeekdayName),
            weekdayShortLabel: date.format(TIME_FORMATS.WeekdayMin),
            dayLabel: date.format(TIME_FORMATS.DayOfMonth),
            monthLabel: date.format(TIME_FORMATS.MonthShort),
        };
    });
};
