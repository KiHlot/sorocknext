import { ReactElement } from 'react';
import { CronInfoIF } from '@/api/admin/types';
import { fetchApi } from '@/helpers/fetchApi';
import CronTPL from '@/templates/CronTPL/CronTPL.component';

export default async function CronPage(): Promise<ReactElement> {
    const cronInfo = await fetchApi<CronInfoIF>(
        '/admin/get-cron-info',
        'reload',
    );

    return <CronTPL data={cronInfo} />;
}
