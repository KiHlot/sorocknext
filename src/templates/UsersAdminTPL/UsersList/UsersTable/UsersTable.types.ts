import { PaginationIF } from '@/types/common';
import { UserIF } from '@/types/user';

export interface UsersTablePropsIF {
    usersList: UserIF[] | null;
    updateOldUsers: (usersId: number[]) => void;
    pagination: PaginationIF | null;
    isFilterLoading: boolean;
}
