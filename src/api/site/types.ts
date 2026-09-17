import { LinkIF, TagIF } from '@/types/common';

export interface BaseData {
    trends: LinkIF[];
    base: {
        supportEmail: string;
    };
    popularTags: TagIF[];
}

export interface ContactFormIF {
    email: string;
    name: string;
    message: string;
}

export interface ContactFormResponseIF {
    isSent: boolean;
}
