import { OptionIF, SearchParamsT } from '@/types/common';

export interface SearchWidgetFormIF {
    phrase: string;
    postTypes?: string[];
    categories?: string[];
}

export interface SearchConfigIF {
    postTypes: OptionIF[];
    categories: OptionIF[];
}

export interface SearchWidgetPropsIF {
    searchConfig: SearchConfigIF;
    queryParams?: SearchParamsT;
}
