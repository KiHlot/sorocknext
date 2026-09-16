import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { PostIF, SeoDataIF } from '@/types/post';
import { fetchApi } from '@/helpers/fetchApi';
import { getMetadata } from '@/helpers/getMetadata/getMetadata';
import PostTPL from '@/templates/PostTPL/PostTPL.component';

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    try {
        const slugs = await fetchApi<string[]>(`/news/get-slugs`);

        return slugs?.map((slug) => ({ slug })) ?? [];
    } catch {
        return [];
    }
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;

    const data = await fetchApi<SeoDataIF>(`/news/metadata/${slug}`);

    return getMetadata(data);
}

export default async function Page({
    params,
}: PageProps): Promise<ReactElement> {
    const { slug } = await params;

    let data: PostIF | null = null;

    try {
        data = await fetchApi<PostIF>(`/news/${slug}`);
    } catch {
        notFound();
    }

    if (!data) {
        notFound();
    }

    return <PostTPL data={data} />;
}
