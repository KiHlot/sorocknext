import { PostShortCardModelIF } from '@/components/cards/PostShortCard/PostShortCard.types';
import { SearchConfigIF } from '@/components/widgets/SearchWidget/SearchWidget.types';

export interface FetchSearchDataIF {
    searchedPages: PostShortCardModelIF[] | null;
}

export interface FetchSearchConfigIF {
    searchConfig: SearchConfigIF;
}
