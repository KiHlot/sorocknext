import { SearchParamsT } from '@/types/common';
import { PostShortCardModelIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import { SearchConfigIF } from '@/components/widgets/SearchWidget/SearchWidget.types';

export interface SearchTPLPropsIF {
    searchConfig?: SearchConfigIF | null;
    searchedPages?: PostShortCardModelIF[] | null;
    queryParams?: SearchParamsT;
}
