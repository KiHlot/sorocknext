export interface SendCodePropsIF {
    className?: string;
    names: string[];
    isDisabled?: boolean;
    callback: (code: string) => void
}
