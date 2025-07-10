import { GetApiResponseIF } from '@/templates/NewsTPL/NewsTPL.types';
import { getApi } from '@/store/functions';
import { getMusicArchiveUrl } from '@/api/music/urls';
import MusicArchiveTPL from '@/templates/MusicArchiveTPL/MusicArchiveTPL.component';

const Music = async () => {
    const data = await getApi<GetApiResponseIF>(getMusicArchiveUrl);

    return <MusicArchiveTPL data={data} />;
};

export default Music;
