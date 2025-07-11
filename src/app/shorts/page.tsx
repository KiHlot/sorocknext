import { PostArchiveIF } from '@/types/post';
import { getApi } from '@/store/functions';
import { getShortsArchiveUrl } from '@/api/shorts/urls';
import ShortsArchiveTPL from '@/templates/ShortsArchiveTPL/ShortsArchiveTPL.component';

const Shorts = async () => {
    const data = await getApi<PostArchiveIF>(getShortsArchiveUrl);

    return <ShortsArchiveTPL data={data} />;
};

export default Shorts;
