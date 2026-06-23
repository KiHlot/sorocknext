import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { SportIF } from '@/api/sport/types';
import { getSportSingleUrl } from '@/api/sport/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const SportSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<SportIF>(`${getSportSingleUrl}/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
};

export default SportSingle;
