import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import { ROCK_DATES_LEAP_YEAR_ANCHOR } from '@/components/sections/RockDatesSection/RockDatesSection.config';
import { RockDateEventIF } from '@/components/sections/RockDatesSection/RockDatesSection.types';

const createDayEvents = (
    monthDay: string,
    titleDate: string,
): RockDateEventIF[] =>
    Array.from(
        { length: MAGIC_NUMBERS.RockDatesEventsPerDay },
        (_, eventIndex): RockDateEventIF => {
            const order = eventIndex + 1;

            return {
                id: `${monthDay}-${order}`,
                monthDay,
                title:
                    eventIndex === 0
                        ? `Событие ${titleDate}`
                        : `Ещё событие ${titleDate}`,
                text: `Описание события ${titleDate}, вариант ${order}.`,
            };
        },
    );

export const ROCK_DATE_EVENTS: RockDateEventIF[] = Array.from(
    { length: MAGIC_NUMBERS.MonthsInYear },
    (_, monthIndex) => {
        const monthStart = dayjs(ROCK_DATES_LEAP_YEAR_ANCHOR).add(
            monthIndex,
            'month',
        );
        const daysInMonth = monthStart.daysInMonth();

        return Array.from({ length: daysInMonth }, (_, dayIndex) => {
            const date = monthStart.add(dayIndex, 'day').locale('ru');
            const monthDay = date.format(TIME_FORMATS.MonthDay);
            const titleDate = date.format(TIME_FORMATS.DayWithMonth);

            return createDayEvents(monthDay, titleDate);
        }).flat();
    },
).flat();
