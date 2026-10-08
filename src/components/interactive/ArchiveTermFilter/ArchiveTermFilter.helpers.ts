import { PostTypeT, getArchiveSlug } from '@/configs/postTypes.config';
import { getDefaultTermSlugs, getTermLabel } from '@/configs/taxonomies.config';
import {
    ARCHIVE_TERM_FILTER_ALL_LABEL,
    ARCHIVE_TERM_FILTER_ALL_SLUG,
} from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.config';
import { ArchiveTermFilterPropsIF } from '@/components/interactive/ArchiveTermFilter/ArchiveTermFilter.types';

export const getArchiveTermFilter = (
    postType: PostTypeT,
    activeSlug?: string,
): ArchiveTermFilterPropsIF | null => {
    const archiveSlug = getArchiveSlug(postType);
    const termSlugs = getDefaultTermSlugs(postType);

    if (termSlugs.length === 0) {
        return null;
    }

    return {
        activeSlug,
        items: [
            {
                slug: ARCHIVE_TERM_FILTER_ALL_SLUG,
                label: ARCHIVE_TERM_FILTER_ALL_LABEL,
                href: `/${archiveSlug}`,
            },
            ...termSlugs.map((slug) => ({
                slug,
                label: getTermLabel(postType, slug),
                href: `/${archiveSlug}/${slug}/1`,
            })),
        ],
    };
};
