'use client';

import {
    FC,
    useRef,
    useLayoutEffect,
    useState,
    useCallback,
    useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { setIsBottomSheetOpen } from '@/store/slices/siteConfig/siteConfig.slice';
import { useOutsideClick } from '@/hooks/outsideClick.hook';
import Overlay from '@/components/elems/Overlay/Overlay.component';
import styles from '@/components/interactive/ModalSheet/BottomSheet/BottomSheet.module.scss';
import { BottomSheetIF } from '@/components/interactive/ModalSheet/BottomSheet/BottomSheet.types';
import Indicator from '@/components/interactive/ModalSheet/BottomSheet/Indicator/Indicator.component';
import { ANIMATION_DELAY } from '@/components/interactive/ModalSheet/ModalSheet.config';

const BottomSheet: FC<BottomSheetIF> = ({ props, overlayId }) => {
    const dispatch = useDispatch();
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const {
        closeHandler,
        isBlockOutsideClick,
        bodyRef,
        classNameWrapper = '',
        classNameBody = '',
        children,
        dataTest,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isShake, setIsShake] = useState(false);

    const handleClose = useCallback((): void => {
        if (isBlockOutsideClick) {
            if (!isShake) {
                setIsShake(true);
                setTimeout(() => setIsShake(false), ANIMATION_DELAY);
            }
            return;
        }

        if (!closeHandler || isClosing) {
            return;
        }

        setIsClosing(true);

        setTimeout(() => {
            setIsClosing(false);
            setIsOpen(false);
            closeHandler();
        }, ANIMATION_DELAY);
    }, [isBlockOutsideClick, isShake, closeHandler, isClosing]);

    useOutsideClick(wrapperRef, handleClose, overlayId);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsOpen(true);
        });
    }, []);

    useLayoutEffect(() => {
        dispatch(setIsBottomSheetOpen(true));

        return () => {
            dispatch(setIsBottomSheetOpen(false));
        };
    }, []);

    return (
        <Overlay>
            <div
                ref={wrapperRef}
                className={`
                    flcol
                    ${styles.bottomSheetWrapper}
                    ${classNameWrapper}
                    ${isOpen ? styles.open : ''}
                    ${isClosing ? styles.closing : ''}
                    ${isShake ? styles.shake : ''}
                `}
                data-test={`${dataTest}_bottom_sheet`}
            >
                <Indicator
                    closeHandler={handleClose}
                    dataTest={`${dataTest}_bottom_sheet_swipe_indicator`}
                />
                <div className={styles.bodyOverflow}>
                    <div
                        className={`${styles.bottomSheetBody} ${classNameBody}`}
                        ref={bodyRef}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Overlay>
    );
};

export default BottomSheet;
