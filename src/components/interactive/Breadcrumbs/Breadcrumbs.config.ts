import { POST_TYPES } from '@/configs/postTypes.config';

export const getArchiveLabel = (slug: string, title?: string): string => {
    if (slug in POST_TYPES) {
        return POST_TYPES[slug as keyof typeof POST_TYPES];
    }

    return title || 'Архив';
};
