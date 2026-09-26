'use client';

import { FC, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import { archiveApi } from '@/api/archive/archive';
import Section from '@/components/blocks/Section/Section.component';
import EventCard from '@/components/cards/EventCard/EventCard.component';
import Loading from '@/components/elems/Loading/Loading.component';
import DaysSlider from '@/components/sections/RockDatesSection/DaysSlider/DaysSlider.component';
import MonthsSlider from '@/components/sections/RockDatesSection/MonthsSlider/MonthsSlider.component';
import { ROCK_DATES_LABELS } from '@/components/sections/RockDatesSection/RockDatesSection.config';
import {
    getMonthDays,
    getMonthStart,
} from '@/components/sections/RockDatesSection/RockDatesSection.helpers';
import styles from '@/components/sections/RockDatesSection/RockDatesSection.module.scss';
import { RockDatesSectionPropsIF } from '@/components/sections/RockDatesSection/RockDatesSection.types';

const RockDatesSection: FC<RockDatesSectionPropsIF> = ({ data }) => {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(() =>
        dayjs().startOf('day'),
    );
    const [queryDate, setQueryDate] = useState<Dayjs | null>(null);
    const isToday = selectedDate.isSame(dayjs(), 'day');
    const isQueryReady = queryDate?.isSame(selectedDate, 'day') ?? false;
    const monthKey = selectedDate.format(TIME_FORMATS.YearMonth);
    const days = getMonthDays(selectedDate);
    const { data: calendarData, isFetching } = archiveApi.useGetCalendarQuery(
        {
            month: selectedDate.month() + 1,
            day: selectedDate.date(),
        },
        { skip: isToday || !isQueryReady },
    );
    const events = isToday ? data : calendarData;
    const showLoader = !isToday && (!isQueryReady || isFetching);
    const showEmpty = !showLoader && !events?.length;

    useEffect(() => {
        if (selectedDate.isSame(dayjs(), 'day')) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setQueryDate(selectedDate);
        }, MAGIC_NUMBERS.CalendarRequestDelay);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [selectedDate]);

    const handleSelectMonth = (monthIndex: number): void => {
        setSelectedDate((current) => {
            if (current.month() === monthIndex) {
                return current;
            }

            const today = dayjs().startOf('day');

            if (monthIndex === today.month()) {
                return today;
            }

            return getMonthStart(today.year(), monthIndex);
        });
    };

    const handleSelectDay = (dayIndex: number): void => {
        setSelectedDate((current) => {
            const nextDate = getMonthStart(
                current.year(),
                current.month(),
            ).add(dayIndex, 'day');

            if (nextDate.isSame(current, 'day')) {
                return current;
            }

            return nextDate;
        });
    };

    return (
        <Section
            ariaLabel={ROCK_DATES_LABELS.section}
            title={ROCK_DATES_LABELS.section}
        >
            <div className="flcol gapBlock">
                <MonthsSlider
                    activeMonthIndex={selectedDate.month()}
                    onSelectMonth={handleSelectMonth}
                />
                <DaysSlider
                    key={monthKey}
                    days={days}
                    activeDayIndex={selectedDate.date() - 1}
                    onSelectDay={handleSelectDay}
                />
                <div
                    className={styles.eventsRegion}
                    aria-live="polite"
                    aria-busy={showLoader}
                >
                    <div
                        key={selectedDate.format(TIME_FORMATS.DateIso)}
                        className={styles.events}
                    >
                        {showLoader ? (
                            <Loading />
                        ) : showEmpty ? (
                            <p className={styles.empty}>
                                {ROCK_DATES_LABELS.emptyDay}
                            </p>
                        ) : (
                            <EventCard
                                data={events}
                                className={styles.eventCard}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default RockDatesSection;
