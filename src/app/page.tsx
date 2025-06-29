import { HomePageDataIF } from '@/api/page/types';
import HomeTPL from '@/templates/HomeTPL/HomeTPL.component';
import { getApi } from '@/store/functions';

const Home = async () => {
    const homePageInfo = await getApi<HomePageDataIF>('/page/home-page-data');

    console.log('homePageInfo', homePageInfo);

    return <HomeTPL data={homePageInfo}/>;
};

export default Home;
