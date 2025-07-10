import { PostArchiveIF } from '@/types/post';
import { getPublicationsArchiveUrl } from '@/api/publications/urls';
import PublicationsArchiveTPL from '@/templates/PublicationsArchiveTPL/PublicationsArchiveTPL.component';
import { getApi } from '@/store/functions';

const Publications = async () => {
    const data = await getApi<PostArchiveIF>(getPublicationsArchiveUrl);

    return <PublicationsArchiveTPL data={data} />;
};

export default Publications;
