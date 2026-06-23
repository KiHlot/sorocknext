import { PostArchiveIF } from '@/types/post';
import { getMusicArchiveUrl } from '@/api/music/urls';
import MusicArchiveTPL from '@/templates/MusicArchiveTPL/MusicArchiveTPL.component';
import { getApi } from '@/store/functions';

const Music = async () => {
    const data = await getApi<PostArchiveIF>(getMusicArchiveUrl);

    return <MusicArchiveTPL data={data} />;
};

export default Music;
