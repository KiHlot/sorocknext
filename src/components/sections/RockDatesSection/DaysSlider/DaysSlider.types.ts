import { RockDateDayIF } from '@/components/sections/RockDatesSection/RockDatesSection.types';

export interface DaysSliderPropsIF {
    days: RockDateDayIF[];
    activeDayIndex: number;
    onSelectDay: (dayIndex: number) => void;
}
