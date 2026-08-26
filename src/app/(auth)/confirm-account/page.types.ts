export interface ConfirmAccountPagePropsIF {
    searchParams: Promise<{
        email?: string;
        confirmCode?: string;
    }>;
}
