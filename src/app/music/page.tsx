import { getApi } from '@/store/functions';
import { getMusicArchiveUrl } from '@/api/music/urls';
import MusicArchiveTPL from '@/templates/MusicArchiveTPL/MusicArchiveTPL.component';
import { PostArchiveIF } from '@/types/post';

const Music = async () => {
    const data = await getApi<PostArchiveIF>(getMusicArchiveUrl);

    return <MusicArchiveTPL data={data} />;
};

export default Music;
