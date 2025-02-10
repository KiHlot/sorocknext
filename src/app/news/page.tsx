import { getApi } from '@/store/functions';
import NewsTPL from '@/templates/NewsTPL/NewsTPL.component';
import { BaseDataIF } from '@/templates/NewsTPL/NewsTPL.types';

const News = async () => {
    const data = await getApi<BaseDataIF>('/news/archive/base/data');

    return <NewsTPL data={data} />;
};

export default News;
