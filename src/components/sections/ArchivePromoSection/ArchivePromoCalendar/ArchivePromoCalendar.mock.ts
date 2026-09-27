import dayjs from 'dayjs';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import { PostShortCardModelIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import { getMonthDayKey } from '@/components/sections/ArchivePromoSection/ArchivePromoCalendar/ArchivePromoCalendar.helpers';
import { getMonthStart } from '@/components/sections/RockDatesSection/RockDatesSection.helpers';

const createPosts = (
    monthIndex: number,
    day: number,
    count: number,
    offset: number,
): PostShortCardModelIF[] => {
    const monthDayKey = getMonthDayKey(monthIndex, day);
    const postDate = getMonthStart(MAGIC_NUMBERS.SampleLeapYear, monthIndex)
        .date(day)
        .format(TIME_FORMATS.BackDateWithTime);

    return Array.from({ length: count }, (_, index): PostShortCardModelIF => {
        const serial = offset + index;

        return {
            thumbnail: '/favicon.svg',
            title: `Рок-дата ${monthDayKey} ${serial + 1}`,
            url: `/rock-data/mock-${monthDayKey}-${serial}`,
            author: {
                img80: null,
                fullName: 'Игорь Лебедев',
                url: '/users/4',
            },
            categories: ['rock_date_rub'],
            postDate,
            year: String(MAGIC_NUMBERS.SampleLeapYear),
        };
    });
};

const buildArchivePromoCalendarEvents = (): Record<
    string,
    PostShortCardModelIF[]
> => {
    const today = dayjs().startOf('day');
    const monthIndex = today.month();
    const lastDay = today.daysInMonth();
    const events: Record<string, PostShortCardModelIF[]> = {};

    const addEvents = (
        eventMonthIndex: number,
        day: number,
        count: number,
    ): void => {
        const key = getMonthDayKey(eventMonthIndex, day);
        const offset = events[key]?.length ?? 0;

        events[key] = [
            ...(events[key] ?? []),
            ...createPosts(eventMonthIndex, day, count, offset),
        ];
    };

    addEvents(monthIndex, today.date(), MAGIC_NUMBERS.CalendarEventBarLimit);

    if (today.date() !== 1) {
        addEvents(monthIndex, 1, 1);
    }

    if (lastDay !== today.date()) {
        addEvents(monthIndex, lastDay, MAGIC_NUMBERS.CalendarEventBarLimit + 1);
    } else if (today.date() !== 1) {
        addEvents(monthIndex, 1, MAGIC_NUMBERS.CalendarEventBarLimit + 1);
    }

    addEvents(
        MAGIC_NUMBERS.FebruaryMonthIndex,
        MAGIC_NUMBERS.FebruaryLastCommonDay,
        1,
    );
    addEvents(
        MAGIC_NUMBERS.FebruaryMonthIndex,
        MAGIC_NUMBERS.LeapDayOfMonth,
        1,
    );

    return events;
};

export const ARCHIVE_PROMO_CALENDAR_EVENTS = buildArchivePromoCalendarEvents();
