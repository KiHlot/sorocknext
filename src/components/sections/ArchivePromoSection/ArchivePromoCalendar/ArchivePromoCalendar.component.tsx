'use client';

import { FC, MouseEvent, ReactElement, useId, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { archiveApi } from '@/api/archive/archive';
import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';
import { TIME_FORMATS } from '@/configs/timeFormats.config';
import PostShortCard from '@/components/cards/PostShortCard/PostShortCard.component';
import Button from '@/components/controls/Button/Button.component';
import Loading from '@/components/elems/Loading/Loading.component';
import ModalSheet from '@/components/interactive/ModalSheet/ModalSheet.component';
import {
    ARCHIVE_PROMO_CALENDAR_LABELS,
    EVENT_BAR_COLOR_KEYS,
} from '@/components/sections/ArchivePromoSection/ArchivePromoCalendar/ArchivePromoCalendar.config';
import {
    formatDayLabel,
    getCalendarCells,
    getDayAriaLabel,
    getEventsForDate,
    getWeekdayLabels,
} from '@/components/sections/ArchivePromoSection/ArchivePromoCalendar/ArchivePromoCalendar.helpers';
import styles from '@/components/sections/ArchivePromoSection/ArchivePromoCalendar/ArchivePromoCalendar.module.scss';
import { ArchivePromoCalendarPropsIF } from '@/components/sections/ArchivePromoSection/ArchivePromoCalendar/ArchivePromoCalendar.types';
import MonthsSlider from '@/components/sections/RockDatesSection/MonthsSlider/MonthsSlider.component';
import { getMonthStart } from '@/components/sections/RockDatesSection/RockDatesSection.helpers';

const ArchivePromoCalendar: FC<ArchivePromoCalendarPropsIF> = ({
    className = '',
}) => {
    const titleId = useId();
    const [selectedDate, setSelectedDate] = useState<Dayjs>(() =>
        dayjs().startOf('day'),
    );
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const selectedDateKey = selectedDate.format(TIME_FORMATS.DateIso);
    const { currentData: rockCalendarData, isError } =
        archiveApi.useGetRockCalendarQuery({
            month: selectedDate.month() + 1,
        });
    const isMonthLoading = rockCalendarData === undefined && !isError;
    const eventsByMonthDay = rockCalendarData ?? {};
    const cells = getCalendarCells(selectedDate, eventsByMonthDay);
    const sheetEvents = getEventsForDate(selectedDate, eventsByMonthDay);
    const weekdayLabels = getWeekdayLabels();

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

    const handleSelectDay = (event: MouseEvent<HTMLButtonElement>): void => {
        const dateKey = event.currentTarget.dataset.date;

        if (!dateKey) {
            return;
        }

        const nextDate = dayjs(dateKey).startOf('day');

        if (!nextDate.isValid()) {
            return;
        }

        setSelectedDate(nextDate);
        setIsSheetOpen(true);
    };

    const handleCloseSheet = (): void => {
        setIsSheetOpen(false);
    };

    const renderSheetBody = (): ReactElement => {
        if (isMonthLoading) {
            return <Loading className={styles.monthLoading} />;
        }

        if (sheetEvents.length === 0) {
            return (
                <p className={styles.empty}>
                    {ARCHIVE_PROMO_CALENDAR_LABELS.emptyDay}
                </p>
            );
        }

        return (
            <div className={styles.sheetList}>
                {sheetEvents.map((postData) => (
                    <div key={postData.url} className={styles.sheetCard}>
                        <PostShortCard postData={postData} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`flcol gapBlock ${styles.calendar} ${className}`}>
            <MonthsSlider
                activeMonthIndex={selectedDate.month()}
                onSelectMonth={handleSelectMonth}
            />
            <div className={styles.weekdays} aria-hidden="true">
                {weekdayLabels.map((label) => (
                    <span key={label} className={styles.weekday}>
                        {label}
                    </span>
                ))}
            </div>
            <div
                className={styles.days}
                role="group"
                aria-label={ARCHIVE_PROMO_CALENDAR_LABELS.days}
                aria-busy={isMonthLoading}
            >
                {isMonthLoading ? (
                    <Loading className={styles.monthLoading} />
                ) : (
                    cells.map((cell): ReactElement => {
                        if (cell.isOutside || cell.dateKey === null) {
                            return (
                                <div key={cell.id} className={styles.cell}>
                                    <span
                                        className={styles.outsideDay}
                                        aria-hidden="true"
                                    >
                                        <span className={styles.dayLabel}>
                                            {cell.label}
                                        </span>
                                    </span>
                                </div>
                            );
                        }

                        const isSelected = cell.dateKey === selectedDateKey;
                        const dayDate = dayjs(cell.dateKey);

                        return (
                            <div key={cell.id} className={styles.cell}>
                                <Button
                                    isCustom
                                    className={`${styles.dayButton} ${isSelected ? styles.selected : ''}`}
                                    data-date={cell.dateKey}
                                    aria-pressed={isSelected}
                                    aria-label={getDayAriaLabel(
                                        dayDate,
                                        cell.eventCount,
                                    )}
                                    clickHandler={handleSelectDay}
                                    dataTest={`archive_promo_day_${cell.dateKey}`}
                                >
                                    <span className={styles.dayLabel}>
                                        {cell.label}
                                    </span>
                                    <span
                                        className={styles.marks}
                                        aria-hidden="true"
                                    >
                                        {cell.eventCount >
                                        MAGIC_NUMBERS.CalendarEventBarLimit ? (
                                            <span
                                                className={styles.overflowMark}
                                            />
                                        ) : (
                                            <>
                                                <span
                                                    className={
                                                        styles.markColumn
                                                    }
                                                >
                                                    {EVENT_BAR_COLOR_KEYS.slice(
                                                        0,
                                                        Math.min(
                                                            cell.eventCount,
                                                            MAGIC_NUMBERS.CalendarEventBarsPerColumn,
                                                        ),
                                                    ).map((colorKey) => (
                                                        <span
                                                            key={`first-${colorKey}`}
                                                            className={`${styles.bar} ${styles[colorKey]}`}
                                                        />
                                                    ))}
                                                </span>
                                                {cell.eventCount >
                                                    MAGIC_NUMBERS.CalendarEventBarsPerColumn && (
                                                    <span
                                                        className={
                                                            styles.markColumn
                                                        }
                                                    >
                                                        {EVENT_BAR_COLOR_KEYS.slice(
                                                            MAGIC_NUMBERS.CalendarEventBarsPerColumn,
                                                            cell.eventCount,
                                                        ).map((colorKey) => (
                                                            <span
                                                                key={`second-${colorKey}`}
                                                                className={`${styles.bar} ${styles[colorKey]}`}
                                                            />
                                                        ))}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </span>
                                </Button>
                            </div>
                        );
                    })
                )}
            </div>
            {isSheetOpen && (
                <ModalSheet
                    closeHandler={handleCloseSheet}
                    size="large"
                    dataTest="archive_promo_calendar"
                    bottomSheetMobile
                    classNameBody={styles.sheetBody}
                >
                    <div
                        className={`flcol gapBlock ${styles.sheet}`}
                        aria-labelledby={titleId}
                    >
                        <h2 id={titleId} className={styles.sheetTitle}>
                            {formatDayLabel(selectedDate)}
                        </h2>
                        {renderSheetBody()}
                    </div>
                </ModalSheet>
            )}
        </div>
    );
};

export default ArchivePromoCalendar;
