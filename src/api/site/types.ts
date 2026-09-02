import { LinkIF, TagIF } from '@/types/common';

export interface BaseData {
    trends: LinkIF[];
    base: {
        supportEmail: string;
    };
    popularTags: TagIF[];
}

export interface ModifyDataIF {
    lastUpdate: string;
    lastUpdateStatus: 'success' | 'error';
    updatedBy: string | 'cron';
    itemsCount?: number;
    label: string;
}

export type JsonStatusesT = Record<string, ModifyDataIF | null>;

export interface ContactFormIF {
    email: string;
    name: string;
    message: string;
}

export interface UsersAdminJsonDataIF {
    modifyData: ModifyDataIF;
    data: number[] | null;
}
