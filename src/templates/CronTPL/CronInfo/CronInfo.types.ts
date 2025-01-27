import { CronInfoIF, ModifyDataIF } from '@/api/site/types';

export interface CronInfoPropsIF {
    modifyData?: ModifyDataIF | null;
    setCronInfoData: (cronInfoData: CronInfoIF | null) => void
}
