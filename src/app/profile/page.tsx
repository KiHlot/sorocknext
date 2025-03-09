import { getApi } from '@/store/functions';
import NewsTPL from '@/templates/NewsTPL/NewsTPL.component';
import { BaseDataIF } from '@/templates/NewsTPL/NewsTPL.types';

const Profile = async () => {
    const data = await getApi<BaseDataIF>('/users/get-profile-data');

    return (
        <div>
            <h1>Профайл</h1>
        </div>
    );
};

export default Profile;
