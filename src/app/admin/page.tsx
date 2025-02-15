import { getApi } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import { CronInfoIF } from '@/api/site/types';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.component';
import UsersAdminTPL from '@/templates/UsersAdminTPL/UsersAdminTPL.component';

const UserUpdate = async () => {
    const usersInfo = await getApi<ResponseIF<CronInfoIF | null>>(
        '/site/get-cron-info',
    );

    return (
        <AdminLayout>
            admin
        </AdminLayout>
    );
};

export default UserUpdate;
