export interface PaginationButtonIF {
    label: number;
    isCurrent: boolean;
}

export interface PaginationButtonPropsIF {
    data: PaginationButtonIF;
    className?: string;
}
