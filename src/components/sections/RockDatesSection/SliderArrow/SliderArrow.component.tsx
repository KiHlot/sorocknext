import { FC } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/sections/RockDatesSection/SliderArrow/SliderArrow.module.scss';
import { SliderArrowPropsIF } from '@/components/sections/RockDatesSection/SliderArrow/SliderArrow.types';

const SliderArrow: FC<SliderArrowPropsIF> = ({
    direction,
    ariaLabel,
    isDisabled = false,
    dataTest,
    clickHandler,
}) => (
    <Button
        isCustom
        className={styles.arrow}
        aria-label={ariaLabel}
        disabled={isDisabled}
        clickHandler={clickHandler}
        dataTest={dataTest}
    >
        {direction === 'prev' ? (
            <IoChevronBack className={styles.icon} aria-hidden="true" />
        ) : (
            <IoChevronForward className={styles.icon} aria-hidden="true" />
        )}
    </Button>
);

export default SliderArrow;
