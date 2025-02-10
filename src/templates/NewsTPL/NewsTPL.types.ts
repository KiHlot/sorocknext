export interface BaseDataIF {
    defaultData: {
        label: string;
        url: string;
    }[];
}

export interface NewsTPLPropsIF {
    data?: BaseDataIF | null;
}
