import { notFound } from 'next/navigation';
import { getApi } from '@/store/functions';
import NewsSingleTPL from '@/templates/NewsSingleTPL/NewsSingleTPL.component';
import { PageProps } from '@/types/common';
import { PostIF } from '@/types/post';

const NewsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<PostIF>(`/news/${slug}`);

        if (!data) {
            notFound();
        }

        return <NewsSingleTPL data={data} />;
    } catch (error) {
        notFound();
    }
};

export default NewsSingle;
