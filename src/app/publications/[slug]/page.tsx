import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { PublicationsIF } from '@/api/publications/types';
import { getPublicationsSingleUrl } from '@/api/publications/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const PublicationsSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<PublicationsIF>(
            `${getPublicationsSingleUrl}/${slug}`,
        );

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
};

export default PublicationsSingle;
