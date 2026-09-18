import { ArchiveSeoDataIF } from '@/components/sections/ArchivePromoSection/ArchivePromoSection.types';

export interface ArchivePromoIntroPropsIF {
    pathname: string;
    title: string;
    titleId: string;
    seoData?: ArchiveSeoDataIF | null;
}
