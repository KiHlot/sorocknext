import { OptionIF } from '@/types/common';

export const getPromoCategories = (
    categories?: Array<string | OptionIF> | null,
): string[] =>
    categories?.flatMap((category) => {
        const slug =
            typeof category === 'string'
                ? category.trim()
                : category?.value?.trim();

        return slug ? [slug] : [];
    }) ?? [];

export const getPromoTags = (
    tags?: Array<string | OptionIF> | null,
): OptionIF[] =>
    tags?.flatMap((tag) => {
        if (typeof tag === 'string') {
            const label = tag.trim().replace(/^#/, '');

            return label ? [{ label, value: label }] : [];
        }

        const label = tag?.label?.trim().replace(/^#/, '');
        const value = tag?.value?.trim();

        if (!label && !value) {
            return [];
        }

        return [
            {
                label: label || value || '',
                value: value || label || '',
            },
        ];
    }) ?? [];
