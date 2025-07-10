import { getCalendarArchiveUrl } from '@/api/calendar/urls';
import CalendarArchiveTPL from '@/templates/CalendarArchiveTPL/CalendarArchiveTPL.component';
import { GetApiResponseIF } from '@/templates/NewsTPL/NewsTPL.types';
import { getApi } from '@/store/functions';
import { getPublicationsArchiveUrl } from '@/api/publications/urls';

const Publications = async () => {
    const data = await getApi<GetApiResponseIF>(getPublicationsArchiveUrl);

    return <CalendarArchiveTPL data={data} />;
};

export default Publications;
