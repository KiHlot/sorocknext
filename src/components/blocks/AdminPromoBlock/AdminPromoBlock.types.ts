import { ReactNode } from 'react';
import { ModifyDataIF } from '@/api/site/types';

export interface AdminPromoBlockPropsIF {
    title: string;
    modifyData?: ModifyDataIF | null;
    children?: ReactNode;
    isLoading?: boolean;
    clickHandler?: () => void;
}
