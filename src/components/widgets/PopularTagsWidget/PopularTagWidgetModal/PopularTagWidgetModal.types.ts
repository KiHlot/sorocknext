import { TagSearchIF } from '@/api/taxonomy/types';

export interface PopularTagModalPropsIF {
    modalLabel: string;
    data?: Record<string, TagSearchIF[]> | null;
    onClose: () => void;
}
