import { getApi } from '@/store/functions';
import HomeTPL from '@/templates/HomeTPL/HomeTPL.component';
import { HomeTPLPropsIF } from '@/templates/HomeTPL/HomeTPL.types';

const Home = async () => {
    const data = await getApi<HomeTPLPropsIF>('/site/base-data');

    return <HomeTPL props={data} />;
};

export default Home;
