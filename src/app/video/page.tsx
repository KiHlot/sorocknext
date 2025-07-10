import { PostArchiveIF } from '@/types/post';
import { getVideoArchiveUrl } from '@/api/video/urls';
import VideoArchiveTPL from '@/templates/VideoArchiveTPL/VideoArchiveTPL.component';
import { getApi } from '@/store/functions';

const Video = async () => {
    const data = await getApi<PostArchiveIF>(getVideoArchiveUrl);

    return <VideoArchiveTPL data={data} />;
};

export default Video;
