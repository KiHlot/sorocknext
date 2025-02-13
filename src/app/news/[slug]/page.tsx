import { notFound } from 'next/navigation';
import { getApi } from '@/store/functions';
import NewsSingleTPL from '@/templates/NewsSingleTPL/NewsSingleTPL.component';
import { PageProps } from '@/types/common';
import { SinglePostIF } from '@/types/post';

const NewsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<SinglePostIF>(`/news/${slug}`);

        if (!data) {
            notFound();
        }

        return <NewsSingleTPL data={data} />;
    } catch (error) {
        notFound();
    }
};

export default NewsSingle;
