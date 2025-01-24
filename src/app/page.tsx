import { getApi } from '@/store/functions';
import HomeTPL from '@/templates/HomeTPL/HomeTPL.component';
import { HomeTPLPropsIF } from '@/templates/HomeTPL/HomeTPL.types';
import { ResponseIF } from '@/store/types';

const Home = async () => {
    const api = await getApi<ResponseIF<HomeTPLPropsIF>>('site/base-data');

    return <HomeTPL props={api?.data} />;
};

export default Home;
