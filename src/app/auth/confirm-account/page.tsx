import { redirect } from 'next/navigation';
import { getApi } from '@/store/functions';
import ConfirmAccountTPL from '@/templates/ConfirmAccountTPL/ConfirmAccountTPL.component';
import { ProfileIF } from '@/types/user';

const ConfirmAccount = async () => {
    const profileData = await getApi<ProfileIF>('/users/get-profile-data');

    if (!profileData) {
        redirect('/');
    }

    return <ConfirmAccountTPL profileData={profileData} />;
};

export default ConfirmAccount;
