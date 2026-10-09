import { OptionIF } from '@/types/common';

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
