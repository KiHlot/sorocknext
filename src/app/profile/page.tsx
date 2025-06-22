import { getApi } from '@/store/functions';
import { BaseDataIF } from '@/templates/NewsTPL/NewsTPL.types';
import ProfileTPL from '@/templates/ProfileTPL/ProfileTPL.component';

const Profile = async () => {
    const data = await getApi<BaseDataIF>('/users/get-current-user');

    return <ProfileTPL data={data} />;
};

export default Profile;
