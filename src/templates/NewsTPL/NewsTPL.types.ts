export interface GetApiResponseIF {
    defaultData: {
        label: string;
        url: string;
    }[];
}

export interface NewsTPLPropsIF {
    data?: GetApiResponseIF | null;
}
