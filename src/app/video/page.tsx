import { getVideoArchiveUrl } from '@/api/video/urls';
import { BaseDataIF } from '@/templates/NewsTPL/NewsTPL.types';
import VideoArchiveTPL from '@/templates/VideoArchiveTPL/VideoArchiveTPL.component';
import { getApi } from '@/store/functions';

const Video = async () => {
    const data = await getApi<BaseDataIF>(getVideoArchiveUrl);

    return <VideoArchiveTPL data={data} />;
};

export default Video;
