export const TIME_FORMATS: Record<string, string> = {
    BackDateWithTime: 'YYYY-MM-DD HH:mm:ss',
    DateUi: 'DD.MM.YYYY',
    DateWithTimeUi: 'DD.MM.YYYY HH:mm',
    DateIso: 'YYYY-MM-DD',
    YearMonth: 'YYYY-MM',
    MonthDay: 'MM-DD',
    MonthName: 'MMMM',
    MonthShort: 'MMM',
    WeekdayName: 'dddd',
    WeekdayMin: 'dd',
    DayOfMonth: 'D',
    DayWithMonth: 'D MMMM',
} as const;
