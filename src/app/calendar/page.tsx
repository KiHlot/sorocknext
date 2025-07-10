import { PostArchiveIF } from '@/types/post';
import { getCalendarArchiveUrl } from '@/api/calendar/urls';
import CalendarArchiveTPL from '@/templates/CalendarArchiveTPL/CalendarArchiveTPL.component';
import { getApi } from '@/store/functions';

const Calendar = async () => {
    const data = await getApi<PostArchiveIF>(getCalendarArchiveUrl);

    return <CalendarArchiveTPL data={data} />;
};

export default Calendar;
