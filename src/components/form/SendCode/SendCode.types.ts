export interface SendCodePropsIF {
    className?: string;
    names: string[];
    hasError?: boolean;
    isDisabled?: boolean;
    callback: (code: string) => void
}
