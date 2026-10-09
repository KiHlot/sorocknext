import { SECTION_DECOR_VARIANTS } from '@/components/blocks/Section/Section.config';

const getDecorIndex = (seed: string, variantCount: number): number => {
    if (!seed || variantCount <= 1) {
        return 0;
    }

    let hash = 0;

    for (let index = 0; index < seed.length; index += 1) {
        hash += seed.codePointAt(index) ?? 0;
    }

    return hash % variantCount;
};

export const getSectionDecorPaths = (
    ariaLabel?: string,
    ariaLabelledBy?: string,
    title?: string,
): readonly string[] => {
    const seed = ariaLabel || ariaLabelledBy || title || '';
    const index = getDecorIndex(seed, SECTION_DECOR_VARIANTS.length);
    const paths = SECTION_DECOR_VARIANTS[index] ?? SECTION_DECOR_VARIANTS[0];

    return paths ?? [];
};
