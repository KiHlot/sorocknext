import { UsersAdminJsonDataIF } from '@/api/site/types';

export interface UsersAdminTPLDataIF {
    jsonData: UsersAdminJsonDataIF;
    siteRoles: string[];
}

export interface UsersAdminTPLPropsIF {
    data?: UsersAdminTPLDataIF | null;
}
