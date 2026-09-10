import { ReactElement } from 'react';
import { LinkIF } from '@/types/common';

export type SiteCategoriesT = Record<string, CategoryConfigIF>;

export interface CategoryConfigIF {
    link: LinkIF;
    icon: ReactElement;
}
