import { PostArchiveIF } from '@/types/post';
import { getShortsArchiveUrl } from '@/api/shorts/urls';
import ShortsArchiveTPL from '@/templates/ShortsArchiveTPL/ShortsArchiveTPL.component';
import { getApi } from '@/store/functions';

const Shorts = async () => {
    const data = await getApi<PostArchiveIF>(getShortsArchiveUrl);

    return <ShortsArchiveTPL data={data} />;
};

export default Shorts;
