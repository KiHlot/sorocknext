import { UserIF } from '@/types/user';

export interface UsersTablePropsIF {
    usersList: UserIF[] | null;
    updateOldUsers: (usersId: number[]) => void;
}
