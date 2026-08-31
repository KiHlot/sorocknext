import { HomePageDataIF } from '@/api/page/types';
import { fetchApi } from '@/helpers/fetchApi';

export const fetchHomePageData = async (): Promise<
    HomePageDataIF | null | undefined
> => fetchApi<HomePageDataIF>('/page/home-page-data');
