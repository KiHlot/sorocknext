import { CronInfoIF, JsonStatusesT } from '@/api/site/types';

export interface CronTablePropsIF {
    jsonStatuses: JsonStatusesT;
    setCronInfoData: (cronInfoData: CronInfoIF | null) => void;
}
