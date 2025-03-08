import {
    JsonStatusesT,
    ModifyDataIF,
    UsersAdminJsonDataIF,
} from '@/api/site/types';

export type UpdateCronTaskT = CronInfoIF | UsersAdminJsonDataIF;

export interface CronInfoIF {
    modifyData: ModifyDataIF;
    jsonStatuses: JsonStatusesT;
}

export interface DeleteUsersResultIF {
    reAssignedUser: number;
    result: {
        userId: number;
        fullName: string;
        isDeleted: boolean;
    }[];
}
