export interface SearchIF {
    phrase: string;
    postTypes?: string[] | null;
    categories?: number[] | null;
}

export interface SearchResultIF {
    pageData: {
        pageId: number;
        thumb: string | null;
        title: string;
        country: string;
        url: string;
        dateUi: string;
    };
    authorData: {
        fullName: string;
        url: string;
        thumb: string | null;
    };
}

export interface BaseData {
    trends: { label: string; url: string }[];
    base: {
        supportEmail: string;
    };
}

export interface ModifyDataIF {
    lastUpdate: string;
    lastUpdateStatus: 'success' | 'error';
    updatedBy: string | 'cron';
    itemsCount?: number;
    label: string;
}

export type JsonStatusesT = Record<string, ModifyDataIF | null>;

export interface CronInfoIF {
    modifyData: ModifyDataIF;
    jsonStatuses: JsonStatusesT;
}
