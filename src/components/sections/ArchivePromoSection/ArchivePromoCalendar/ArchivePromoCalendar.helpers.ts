import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import { PostShortCardModelIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import { ArchivePromoCalendarCellIF } from '@/components/sections/ArchivePromoSection/ArchivePromoCalendar/ArchivePromoCalendar.types';
import { getMonthStart } from '@/components/sections/RockDatesSection/RockDatesSection.helpers';

export const getMonthDayKey = (monthIndex: number, day: number): string =>
    getMonthStart(MAGIC_NUMBERS.SampleLeapYear, monthIndex)
        .date(day)
        .format(TIME_FORMATS.MonthDay);

export const formatDayLabel = (date: Dayjs): string =>
    date.clone().locale('ru').format(TIME_FORMATS.DayWithMonth);

export const getDayAriaLabel = (date: Dayjs, eventCount: number): string => {
    const dateLabel = formatDayLabel(date);

    if (eventCount === 0) {
        return `${dateLabel}, событий нет`;
    }

    return `${dateLabel}, событий: ${eventCount}`;
};

export const getEventsForDate = (
    date: Dayjs,
    eventsByMonthDay: Record<string, PostShortCardModelIF[]>,
): PostShortCardModelIF[] => {
    const events = eventsByMonthDay[date.format(TIME_FORMATS.MonthDay)] ?? [];
    const isFebruaryTwentyEighth =
        date.month() === MAGIC_NUMBERS.FebruaryMonthIndex &&
        date.date() === MAGIC_NUMBERS.FebruaryLastCommonDay;
    const februaryLength = getMonthStart(
        date.year(),
        MAGIC_NUMBERS.FebruaryMonthIndex,
    ).daysInMonth();

    if (
        !isFebruaryTwentyEighth ||
        februaryLength === MAGIC_NUMBERS.LeapDayOfMonth
    ) {
        return events;
    }

    const leapDayEvents =
        eventsByMonthDay[
            getMonthDayKey(
                MAGIC_NUMBERS.FebruaryMonthIndex,
                MAGIC_NUMBERS.LeapDayOfMonth,
            )
        ] ?? [];

    return [...events, ...leapDayEvents];
};

const getMondayOffset = (date: Dayjs): number =>
    (date.day() + MAGIC_NUMBERS.MondayWeekdayOffset) % MAGIC_NUMBERS.DaysInWeek;

export const getWeekdayLabels = (): string[] => {
    const today = dayjs().locale('ru');
    const monday = today.subtract(getMondayOffset(today), 'day');

    return Array.from({ length: MAGIC_NUMBERS.DaysInWeek }, (_, index) =>
        monday.add(index, 'day').format(TIME_FORMATS.WeekdayMin),
    );
};

const toOutsideCell = (date: Dayjs): ArchivePromoCalendarCellIF => ({
    id: `out-${date.format(TIME_FORMATS.DateIso)}`,
    label: date.format(TIME_FORMATS.DayOfMonth),
    isOutside: true,
    dateKey: null,
    eventCount: 0,
});

export const getCalendarCells = (
    monthDate: Dayjs,
    eventsByMonthDay: Record<string, PostShortCardModelIF[]>,
): ArchivePromoCalendarCellIF[] => {
    const monthStart = getMonthStart(monthDate.year(), monthDate.month());
    const daysInMonth = monthStart.daysInMonth();
    const leadingCount = getMondayOffset(monthStart);
    const occupiedCount = leadingCount + daysInMonth;
    const trailingCount =
        (MAGIC_NUMBERS.DaysInWeek -
            (occupiedCount % MAGIC_NUMBERS.DaysInWeek)) %
        MAGIC_NUMBERS.DaysInWeek;
    const leadingCells = Array.from(
        { length: leadingCount },
        (_, index): ArchivePromoCalendarCellIF =>
            toOutsideCell(monthStart.subtract(leadingCount - index, 'day')),
    );
    const monthCells = Array.from(
        { length: daysInMonth },
        (_, dayIndex): ArchivePromoCalendarCellIF => {
            const date = monthStart.add(dayIndex, 'day');
            const dateKey = date.format(TIME_FORMATS.DateIso);

            return {
                id: dateKey,
                label: date.format(TIME_FORMATS.DayOfMonth),
                isOutside: false,
                dateKey,
                eventCount: getEventsForDate(date, eventsByMonthDay).length,
            };
        },
    );
    const trailingCells = Array.from(
        { length: trailingCount },
        (_, index): ArchivePromoCalendarCellIF =>
            toOutsideCell(monthStart.add(daysInMonth + index, 'day')),
    );

    return [...leadingCells, ...monthCells, ...trailingCells];
};
