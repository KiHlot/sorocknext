import { DeleteUsersResultIF } from '@/api/admin/types';

export interface DeleteSuccessModalPropsIF {
    data: DeleteUsersResultIF | null;
    isOpen: boolean;
    onClose: () => void;
}
