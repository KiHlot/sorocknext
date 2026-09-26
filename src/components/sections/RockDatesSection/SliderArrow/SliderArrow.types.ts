import { MouseEvent } from 'react';

export type SliderArrowDirectionT = 'prev' | 'next';

export interface SliderArrowPropsIF {
    direction: SliderArrowDirectionT;
    ariaLabel: string;
    isDisabled?: boolean;
    dataTest: string;
    clickHandler: (event: MouseEvent<HTMLButtonElement>) => void;
}
