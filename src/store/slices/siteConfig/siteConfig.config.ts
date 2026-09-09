import { SiteConfigIF } from '@/store/slices/siteConfig/siteConfig.types';

export const SITE_CONFIG_DEFAULT_STATE: SiteConfigIF = {
    isBottomSheetOpen: false,
    isGlobalLoading: false,
    isLeftMenuOpened: false,
    overlayStack: [],
};
