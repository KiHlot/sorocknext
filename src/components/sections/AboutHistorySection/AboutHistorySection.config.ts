import { ValueOfT } from '@/types/common';

export const ABOUT_HISTORY_COPY = {
    titleId: 'about-history-title',
    title: 'История проекта Сорок Ру',
} as const;

export const ABOUT_TIMELINE_VARIANT = {
    History: 'history',
    Facts: 'facts',
} as const;

export type AboutTimelineVariantT = ValueOfT<typeof ABOUT_TIMELINE_VARIANT>;
