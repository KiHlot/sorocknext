import { POST_TYPES } from '@/configs/postTypes.config';
import {
    STANDARD_TAXONOMIES,
    TAG_PATH,
    getKnownTermLabel,
} from '@/configs/taxonomies.config';

export const getArchiveLabel = (slug: string, title?: string): string => {
    if (slug in POST_TYPES) {
        return POST_TYPES[slug as keyof typeof POST_TYPES];
    }

    const termLabel = getKnownTermLabel(slug);

    if (termLabel) {
        return termLabel;
    }

    if (slug === TAG_PATH) {
        return STANDARD_TAXONOMIES.post_tag.label;
    }

    return title || 'Архив';
};
