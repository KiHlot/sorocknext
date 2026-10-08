import { POST_TYPES, getPostTypeBySlug } from '@/configs/postTypes.config';
import {
    STANDARD_TAXONOMIES,
    TAG_PATH,
    getKnownTermLabel,
} from '@/configs/taxonomies.config';

export const getArchiveLabel = (slug: string, title?: string): string => {
    const postType = getPostTypeBySlug(slug);

    if (postType) {
        return POST_TYPES[postType];
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
