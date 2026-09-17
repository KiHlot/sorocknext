import { ReactNode } from 'react';
import { ValueOfT } from '@/types/common';
import { MODAL_SHEET_SIZES } from '@/components/interactive/ModalSheet/ModalSheet.config';

export interface ModalSheetPropsIF {
    children: ReactNode;
    dataTest: string;
    closeHandler?: () => void;
    bodyRef?: (node: HTMLDivElement | null) => void;
    size?: ValueOfT<typeof MODAL_SHEET_SIZES>;
    classNameWrapper?: string;
    classNameBody?: string;
    isLoading?: boolean;
    isBlockOutsideClick?: boolean;
    bottomSheetMobile?: boolean;
    isHideClose?: boolean;
    custom?: true;
}
