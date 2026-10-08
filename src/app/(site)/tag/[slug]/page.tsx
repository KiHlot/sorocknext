import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { TAG_PATH } from '@/configs/taxonomies.config';
import ArchiveTPL from '@/templates/ArchiveTPL/ArchiveTPL.component';

type TagPagePropsT = PageProps<{ slug: string }>;

export async function generateMetadata({
    params,
}: TagPagePropsT): Promise<Metadata> {
    const { slug } = await params;
    const term = slug.trim();

    if (!term) {
        notFound();
    }

    return { title: term };
}

const TagPage = async ({ params }: TagPagePropsT): Promise<ReactElement> => {
    const { slug } = await params;
    const term = slug.trim();

    if (!term) {
        notFound();
    }

    return <ArchiveTPL pathname={`/${TAG_PATH}/${term}`} title={term} />;
};

export default TagPage;
