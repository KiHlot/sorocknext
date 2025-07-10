import { PostArchiveIF } from '@/types/post';
import { getSportArchiveUrl } from '@/api/sport/urls';
import SportArchiveTPL from '@/templates/SportArchiveTPL/SportArchiveTPL.component';
import { getApi } from '@/store/functions';

const Sport = async () => {
    const data = await getApi<PostArchiveIF>(getSportArchiveUrl);

    return <SportArchiveTPL data={data} />;
};

export default Sport;
