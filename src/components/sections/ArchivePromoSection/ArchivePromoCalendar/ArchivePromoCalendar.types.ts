export interface ArchivePromoCalendarPropsIF {
    className?: string;
}

export interface ArchivePromoCalendarCellIF {
    id: string;
    label: string;
    isOutside: boolean;
    dateKey: string | null;
    eventCount: number;
}
