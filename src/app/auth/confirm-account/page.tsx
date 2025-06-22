import { redirect } from 'next/navigation';
import { getApi } from '@/store/functions';
import ConfirmAccountTPL from '@/templates/ConfirmAccountTPL/ConfirmAccountTPL.component';
import { CurrentUserIF } from '@/types/user';

const ConfirmAccount = async () => {
    const profileData = await getApi<CurrentUserIF>('/users/get-profile-data');

    if (!profileData) {
        redirect('/');
    }

    return <ConfirmAccountTPL profileData={profileData} />;
};

export default ConfirmAccount;
