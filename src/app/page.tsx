import { getApi } from '@/helpers/api';
import HomeTPL from '@/templates/HomeTPL/HomeTPL.component';

const Home = async () => {
    // const api = await getApi<any>('page/main-page-data');

    // console.log('api', api);

    // return <>{api && <HomeTPL data={api} />}</>;
    return <HomeTPL />;
};

export default Home;
