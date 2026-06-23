import { PostArchiveIF } from '@/types/post';
import { getNewsArchiveUrl } from '@/api/news/urls';
import NewsArchiveTPL from '@/templates/NewsArchiveTPL/NewsArchiveTPL.component';
import { getApi } from '@/store/functions';

const News = async () => {
    const data = await getApi<PostArchiveIF>(getNewsArchiveUrl);

    return <NewsArchiveTPL data={data} />;
};

export default News;
