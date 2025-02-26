import { getApi } from '@/store/functions';
import { CronInfoIF } from '@/api/site/types';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.component';
import CronTPL from '@/templates/CronTPL/CronTPL.component';

const Help = async () => {
    const cronInfo = await getApi<CronInfoIF>('/site/get-cron-info', 'reload');

    return (
        <AdminLayout isLoading={!cronInfo}>
            <CronTPL data={cronInfo} />
        </AdminLayout>
    );
};

export default Help;
