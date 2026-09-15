import { TagSearchIF } from '@/api/taxonomy/types';

export interface PopularTagModalPropsIF {
    modalLabel: string;
    isLoading: boolean;
    isError?: boolean;
    data?: Record<string, TagSearchIF[]> | null;
    onClose: () => void;
}
