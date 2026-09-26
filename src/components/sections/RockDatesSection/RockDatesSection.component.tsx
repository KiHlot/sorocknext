'use client';

import { FC, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import Section from '@/components/blocks/Section/Section.component';
import EventCard from '@/components/cards/EventCard/EventCard.component';
import DaysSlider from '@/components/sections/RockDatesSection/DaysSlider/DaysSlider.component';
import MonthsSlider from '@/components/sections/RockDatesSection/MonthsSlider/MonthsSlider.component';
import { ROCK_DATES_LABELS } from '@/components/sections/RockDatesSection/RockDatesSection.config';
import {
    getEventsForDate,
    getFirstDateWithEvents,
    getMonthDays,
    getMonthStart,
} from '@/components/sections/RockDatesSection/RockDatesSection.helpers';
import styles from '@/components/sections/RockDatesSection/RockDatesSection.module.scss';

const RockDatesSection: FC = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs>(() =>
        dayjs().startOf('day'),
    );
    const monthKey = selectedDate.format(TIME_FORMATS.YearMonth);
    const days = getMonthDays(selectedDate);
    const events = getEventsForDate(selectedDate);

    const handleSelectMonth = (monthIndex: number): void => {
        setSelectedDate((current) => {
            if (current.month() === monthIndex) {
                return current;
            }

            const today = dayjs().startOf('day');

            if (monthIndex === today.month()) {
                return today;
            }

            return getFirstDateWithEvents(
                getMonthStart(today.year(), monthIndex),
            );
        });
    };

    const handleSelectDay = (dayIndex: number): void => {
        setSelectedDate((current) =>
            getMonthStart(current.year(), current.month()).add(dayIndex, 'day'),
        );
    };

    return (
        <Section
            className={styles.section}
            ariaLabel={ROCK_DATES_LABELS.section}
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
                <div className={styles.eventsRegion} aria-live="polite">
                    <div
                        key={selectedDate.format(TIME_FORMATS.DateIso)}
                        className={styles.events}
                    >
                        {events.length > 0 ? (
                            events.map((event) => (
                                <EventCard
                                    key={event.id}
                                    className={styles.eventCard}
                                    title={event.title}
                                    text={event.text}
                                    authorName={event.authorName}
                                    tags={event.tags}
                                    country={event.country}
                                    cover={event.cover}
                                    url={event.url}
                                />
                            ))
                        ) : (
                            <p className={styles.empty}>
                                {ROCK_DATES_LABELS.emptyDay}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default RockDatesSection;
