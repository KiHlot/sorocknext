import { GetApiResponseIF } from '@/templates/NewsTPL/NewsTPL.types';
import { getApi } from '@/store/functions';
import SportArchiveTPL from '@/templates/SportArchiveTPL/SportArchiveTPL.component';
import { getSportArchiveUrl } from '@/api/sport/urls';

const Sport = async () => {
    const data = await getApi<GetApiResponseIF>(getSportArchiveUrl);

    return <SportArchiveTPL data={data} />;
};

export default Sport;
