import { getApi } from '@/store/functions';
import NewsTPL from '@/templates/NewsTPL/NewsTPL.component';
import { BaseDataIF } from '@/templates/NewsTPL/NewsTPL.types';
import ProfileTPL from '@/templates/ProfileTPL/ProfileTPL.component';

const Profile = async () => {
    const data = await getApi<BaseDataIF>('/users/get-profile-data');

    return <ProfileTPL data={data} />;
};

export default Profile;
