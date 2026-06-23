import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { CalendarIF } from '@/api/calendar/types';
import { getCalendarSingleUrl } from '@/api/calendar/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const CalendarSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<CalendarIF>(
            `${getCalendarSingleUrl}/${slug}`,
        );

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch {
        notFound();
    }
};

export default CalendarSingle;
