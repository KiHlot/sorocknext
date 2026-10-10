import { TaxonomyTermCountIF } from '@/types/post';
import { PostTypeT, getArchiveSlug } from '@/configs/postTypes.config';
import {
    CUSTOM_TAXONOMIES,
    getCustomTaxonomy,
    getDefaultTermSlugs,
    getTermLabel,
} from '@/configs/taxonomies.config';
import {
    TaxonomyTermLinkIF,
    TaxonomyTermsWidgetPropsIF,
} from '@/components/widgets/TaxonomyTermsWidget/TaxonomyTermsWidget.types';

export const getTaxonomySidebarTerms = (
    postType: PostTypeT,
    terms: TaxonomyTermCountIF[] | null,
): TaxonomyTermsWidgetPropsIF | null => {
    const taxonomy = getCustomTaxonomy(postType);

    if (!taxonomy || !terms?.length) {
        return null;
    }

    const counts = new Map(
        terms.map((term): [string, number] => [term.slug, term.count]),
    );
    const archiveSlug = getArchiveSlug(postType);
    const items = getDefaultTermSlugs(postType).flatMap(
        (slug): TaxonomyTermLinkIF[] => {
            const count = counts.get(slug);

            if (count === undefined) {
                return [];
            }

            return [
                {
                    slug,
                    label: getTermLabel(postType, slug),
                    count,
                    href: `/${archiveSlug}/${slug}/1`,
                },
            ];
        },
    );

    if (items.length === 0) {
        return null;
    }

    return {
        title: CUSTOM_TAXONOMIES[taxonomy].label,
        items,
    };
};
