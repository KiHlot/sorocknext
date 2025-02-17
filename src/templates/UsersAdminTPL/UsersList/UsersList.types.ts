import { FilteredResultIF } from '@/types/common';
import { UserIF } from '@/types/user';

export interface UsersListPropsIF {
    filterResult?: FilteredResultIF<UserIF[]> | null;
}
