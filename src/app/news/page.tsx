import { getApi } from '@/store/functions';
import NewsTPL from '@/templates/NewsTPL/NewsTPL.component';
import { GetApiResponseIF } from '@/templates/NewsTPL/NewsTPL.types';

const News = async () => {
    const data = await getApi<GetApiResponseIF>('/news/archive/base/data');

    return <NewsTPL data={data} />;
};

export default News;
