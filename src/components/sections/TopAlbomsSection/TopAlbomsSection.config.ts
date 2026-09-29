import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';

export const TOP_ALBOMS_LIMIT = MAGIC_NUMBERS.TopAlbomsLimit;

export const TOP_ALBOMS_WIDE_INDEXES: readonly number[] = [
    MAGIC_NUMBERS.TopAlbomsFirstWideIndex,
    MAGIC_NUMBERS.TopAlbomsSecondWideIndex,
];

export const TOP_ALBOMS_LABELS = {
    section: 'Топ альбомов',
    tabs: 'Списки альбомов',
    grid: 'Альбомы топа',
    player: 'Плеер альбома',
    prevTab: 'Предыдущие списки',
    nextTab: 'Следующие списки',
} as const;
