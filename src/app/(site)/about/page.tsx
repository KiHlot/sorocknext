import { ReactElement } from 'react';
import type { Metadata } from 'next';
import { fetchMetadata } from '@/api/metadata/endpoints';
import AboutTPL from '@/templates/AboutTPL/AboutTPL.component';

export async function generateMetadata(): Promise<Metadata> {
    return fetchMetadata({
        type: 'page',
        slug: 'about',
    });
}

export default function AboutPage(): ReactElement {
    return <AboutTPL />;
}
