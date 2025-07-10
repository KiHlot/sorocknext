import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { PostIF } from '@/types/post';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const NewsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<PostIF>(`/news/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch (error) {
        notFound();
    }
};

export default NewsSingle;
