import { UsersAdminJsonDataIF } from '@/api/site/types';
import { FilteredResultIF } from '@/types/common';
import { UserIF } from '@/types/user';

export interface UsersAdminTPLDataIF {
    jsonData: UsersAdminJsonDataIF;
    siteRoles: string[];
    filterResult: FilteredResultIF<UserIF[]>
}

export interface UsersAdminTPLPropsIF {
    data?: UsersAdminTPLDataIF | null;
}
