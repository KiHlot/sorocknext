import { getApi } from '@/store/functions';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.component';
import UsersAdminTPL from '@/templates/UsersAdminTPL/UsersAdminTPL.component';
import { UsersAdminTPLDataIF } from '@/templates/UsersAdminTPL/UsersAdminTPL.types';

const UserUpdate = async () => {
    const usersInfo = await getApi<UsersAdminTPLDataIF>('/site/get-users-info');

    return (
        <AdminLayout>
            <UsersAdminTPL data={usersInfo} />
        </AdminLayout>
    );
};

export default UserUpdate;
