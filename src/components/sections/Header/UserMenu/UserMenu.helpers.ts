import { CallBackTypeT } from '@/types/common';
import { logout } from '@/helpers/logout/logout';

export const userMenuClickHandler = async (
    callBackType: CallBackTypeT,
): Promise<void> => {
    switch (callBackType) {
        case 'logout': {
            await logout();
            break;
        }
        default: {
            break;
        }
    }
};
