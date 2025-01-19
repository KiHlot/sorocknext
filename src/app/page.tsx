import { getApi } from '@/store/functions';
import HomeTPL from '@/templates/HomeTPL/HomeTPL.component';

const Home = async () => {
    const api = await getApi<any>('site/base-data');

    console.log('api', api);

    // return <>{api && <HomeTPL data={api} />}</>;
    return <HomeTPL />;
};

export default Home;
