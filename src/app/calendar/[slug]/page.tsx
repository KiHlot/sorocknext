import { notFound } from 'next/navigation';
import { PageProps } from '@/types/common';
import { CalendarSingleIF } from '@/api/calendar/types';
import { getCalendarSingleUrl } from '@/api/calendar/urls';
import PostTPL from '@/templates/PostTPL/PostTPL.component';
import { getApi } from '@/store/functions';

const CalendarSingle = async ({ params }: PageProps) => {
    const { slug } = await params;

    try {
        const data = await getApi<CalendarSingleIF>(
            `${getCalendarSingleUrl}/${slug}`,
        );

        if (!data) {
            notFound();
        }

        return <PostTPL data={data} />;
    } catch (error) {
        notFound();
    }
};

export default CalendarSingle;
