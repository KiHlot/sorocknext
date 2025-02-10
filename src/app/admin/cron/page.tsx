import { getApi } from '@/store/functions';
import { ResponseIF } from '@/store/types';
import { CronInfoIF } from '@/api/site/types';
import CronTPL from '@/templates/CronTPL/CronTPL.component';

const Help = async () => {
    const cronInfo =
        await getApi<ResponseIF<CronInfoIF | null>>('/site/get-cron-info');

    return <CronTPL data={cronInfo?.data} />;
};

export default Help;
