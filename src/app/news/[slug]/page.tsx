import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ResponseIF } from '@/types/api';
import { PageProps } from '@/types/common';
import { PostIF, SeoDataIF } from '@/types/post';
import { fetchApi } from '@/helpers/fetchApi';
import { getMetadata } from '@/helpers/getMetadata/getMetadata';
import PostTPL from '@/templates/PostTPL/PostTPL.component';

/**
 * Генерирует список всех слаг-ов для статической генерации.
 * Если не удалось получить список, возвращается пустой массив — страницы будут создаваться динамически.
 */

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    try {
        // Запрашиваем последние 100 новостей (можно увеличить или добавить пагинацию)
        const data = await fetchApi<ResponseIF<string[]>>(`/news/get-slugs`);

        console.log('data', data);

        if (data?.data?.length) {
            return data.data.map((slug) => ({
                slug,
            }));
        }
    } catch (error) {
        // Логируем ошибку, но не прерываем сборку
        console.warn(
            'Не удалось получить список слаг-ов для статической генерации',
            error,
        );
    }

    // Если нет данных, возвращаем пустой массив — всё будет работать динамически
    return [];
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

    try {
        const data = await fetchApi<PostIF>(`news/${slug}`);

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
}
