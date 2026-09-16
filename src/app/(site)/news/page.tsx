import { ReactElement } from 'react';
import { PostArchiveIF } from '@/types/post';
import { fetchApi } from '@/helpers/fetchApi';
import NewsArchiveTPL from '@/templates/NewsArchiveTPL/NewsArchiveTPL.component';

const News = async (): Promise<ReactElement> => {
    const data = await fetchApi<PostArchiveIF>('/news/archive');

    return <NewsArchiveTPL data={data} />;
};

export default News;
