import { getCalendarArchiveUrl } from '@/api/calendar/urls';
import CalendarArchiveTPL from '@/templates/CalendarArchiveTPL/CalendarArchiveTPL.component';
import { GetApiResponseIF } from '@/templates/NewsTPL/NewsTPL.types';
import { getApi } from '@/store/functions';

const Calendar = async () => {
    const data = await getApi<GetApiResponseIF>(getCalendarArchiveUrl);

    return <CalendarArchiveTPL data={data} />;
};

export default Calendar;
