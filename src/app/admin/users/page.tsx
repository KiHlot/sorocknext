import { getApi } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import { CronInfoIF } from '@/api/site/types';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.component';
import UsersAdminTPL from '@/templates/UsersAdminTPL/UsersAdminTPL.component';

const UserUpdate = async () => {
    const usersInfo = await getApi<CronInfoIF>(
        '/site/get-users-info',
    );

    return (
        <AdminLayout>
            <UsersAdminTPL data={usersInfo} />
        </AdminLayout>
    );
};

export default UserUpdate;
