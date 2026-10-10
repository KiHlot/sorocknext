import { LinkIF, TagIF } from '@/types/common';

export interface WhoWeAreItemIF {
    title: string;
    text: string;
}

export interface BaseData {
    trends: LinkIF[];
    base: {
        supportEmail: string;
    };
    popularTags: TagIF[];
    whoWeAre?: WhoWeAreItemIF[] | null;
}

export interface ContactFormIF {
    email: string;
    name: string;
    message: string;
}

export interface ContactFormResponseIF {
    isSent: boolean;
}
