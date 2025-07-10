import { getVideoArchiveUrl } from '@/api/video/urls';
import { GetApiResponseIF } from '@/templates/NewsTPL/NewsTPL.types';
import VideoArchiveTPL from '@/templates/VideoArchiveTPL/VideoArchiveTPL.component';
import { getApi } from '@/store/functions';

const Video = async () => {
    const data = await getApi<GetApiResponseIF>(getVideoArchiveUrl);

    return <VideoArchiveTPL data={data} />;
};

export default Video;
