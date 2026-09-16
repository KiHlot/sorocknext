import { PostShortCardModelIF } from '@/components/cards/PostShortCard/PostShortCard.types';

export interface PopularTagModalPropsIF {
    modalLabel: string;
    isLoading: boolean;
    isError?: boolean;
    data?: Record<string, PostShortCardModelIF[]> | null;
    onClose: () => void;
}
