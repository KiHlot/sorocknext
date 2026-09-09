import { FC, TouchEvent, useCallback, useMemo, useState } from 'react';
import Button from '@/components/controls/Button/Button.component';
import { SWIPE_THRESHOLD } from '@/components/interactive/ModalSheet/BottomSheet/BottomSheet.config';
import styles from '@/components/interactive/ModalSheet/BottomSheet/Indicator/Indicator.module.scss';
import { IndicatorPropsIF } from '@/components/interactive/ModalSheet/BottomSheet/Indicator/Indicator.types';

const Indicator: FC<IndicatorPropsIF> = ({ onClose }) => {
    const [isSwiping, setIsSwiping] = useState<boolean>(false);
    const [touchStartY, setTouchStartY] = useState<number>(0);
    const [touchCurrentY, setTouchCurrentY] = useState<number>(0);

    const swipeDistance = useMemo(
        () => Math.max(0, touchCurrentY - touchStartY),
        [touchCurrentY, touchStartY],
    );

    const shouldClose = useMemo(
        () => swipeDistance > SWIPE_THRESHOLD,
        [swipeDistance],
    );

    const handleTouchStart = useCallback(
        (event: TouchEvent<HTMLButtonElement>) => {
            setTouchStartY(event.touches[0]?.clientY || 0);
            setTouchCurrentY(event.touches[0]?.clientY || 0);
            setIsSwiping(true);
        },
        [],
    );

    const handleTouchMove = useCallback(
        (event: TouchEvent<HTMLButtonElement>) => {
            if (!isSwiping) {
                return;
            }
            setTouchCurrentY(event.touches[0]?.clientY || 0);
        },
        [isSwiping],
    );

    const handleTouchEnd = useCallback(() => {
        if (!isSwiping) {
            return;
        }

        if (shouldClose) {
            onClose?.();
        }

        setIsSwiping(false);
        setTouchStartY(0);
        setTouchCurrentY(0);
    }, [isSwiping, shouldClose, onClose]);

    return (
        <div className={`flc ${styles.indicatorWrapper}`}>
            <Button
                isCustom
                className={`flc ${styles.swipeIndicatorButton}`}
                style={{ transform: `translateY(${swipeDistance}px)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                dataTest="bottom_sheet_swipe_indicator_button"
            />
            <span className={styles.swipeIndicator} />
        </div>
    );
};

export default Indicator;
