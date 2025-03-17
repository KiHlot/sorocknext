import { PaginationIF } from '@/types/common';
import { UserIF } from '@/types/user';

export interface UsersTablePropsIF {
    usersList: UserIF[] | null;
    callbacks: {
        updateUsers: (usersId: number[]) => void;
        deleteUsers: (usersId: number[]) => void;
        updateRoles: () => void;
    };
    pagination: PaginationIF | null;
    isDataLoading: boolean;
}
