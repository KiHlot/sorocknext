import { MAGIC_NUMBERS } from '@/configs/magicNumbers.config';

export const TOP_ALBUMS_LIMIT = MAGIC_NUMBERS.TopAlbumsLimit;

export const TOP_ALBUMS_WIDE_INDEXES: readonly number[] = [
    MAGIC_NUMBERS.TopAlbumsFirstWideIndex,
    MAGIC_NUMBERS.TopAlbumsSecondWideIndex,
];

export const TOP_ALBUMS_LABELS = {
    section: 'Топ альбомов',
    tabs: 'Списки альбомов',
    grid: 'Альбомы топа',
    player: 'Плеер альбома',
    prevTab: 'Предыдущие списки',
    nextTab: 'Следующие списки',
} as const;
