'use client';

import { FC, useEffect, useRef, useState, useCallback } from 'react';
import { IoClose } from 'react-icons/io5';
import { useOutsideClick } from '@/hooks/outsideClick.hook';
import Button from '@/components/controls/Button/Button.component';
import Loading from '@/components/elems/Loading/Loading.component';
import Overlay from '@/components/elems/Overlay/Overlay.component';
import styles from '@/components/interactive/ModalSheet/Modal/Modal.module.scss';
import { ModalPropsIF } from '@/components/interactive/ModalSheet/Modal/Modal.types';
import {
    ANIMATION_DELAY,
    MODAL_SHEET_SIZES,
} from '@/components/interactive/ModalSheet/ModalSheet.config';

const Modal: FC<ModalPropsIF> = ({ props, overlayId }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const {
        children,
        onClose,
        dataTest,
        size = MODAL_SHEET_SIZES.Medium,
        isLoading,
        classNameWrapper = '',
        classNameBody = '',
        isBlockOutsideClick,
        isHideClose,
        custom,
        bodyRef,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isShake, setIsShake] = useState(false);

    const closeHandler = useCallback(
        (isCheckOutsideClick?: boolean): void => {
            if (isCheckOutsideClick && isBlockOutsideClick) {
                if (!isShake) {
                    setIsShake(true);
                    setTimeout(() => setIsShake(false), ANIMATION_DELAY);
                }
                return;
            }

            if (!onClose || isClosing) {
                return;
            }

            setIsClosing(true);

            setTimeout(() => {
                setIsClosing(false);
                setIsOpen(false);
                onClose();
            }, ANIMATION_DELAY);
        },
        [isBlockOutsideClick, isShake, onClose, isClosing],
    );

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                closeHandler(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeHandler]);

    useOutsideClick(wrapperRef, () => closeHandler(true), overlayId);

    useEffect(() => {
        requestAnimationFrame(() => {
            setIsOpen(true);
        });
    }, []);

    return (
        <Overlay className="flc">
            <div
                className={`
                    scrollbar
                    ${styles.modalWrapper}
                    ${styles[size]}
                    ${custom ? styles.custom : ''}
                    ${classNameWrapper}
                    ${isOpen ? styles.open : ''}
                    ${isClosing ? styles.closing : ''}
                    ${isShake ? styles.shake : ''}
                `}
                ref={wrapperRef}
                data-test={`${dataTest}_modal`}
            >
                {!isHideClose && (
                    <Button
                        isCustom
                        clickHandler={() => closeHandler()}
                        className={`flc ${styles.closeButton}`}
                        type="button"
                        dataTest={`${dataTest}_modal_close`}
                    >
                        <IoClose />
                    </Button>
                )}
                <div
                    className={`${styles.modalBody} ${classNameBody}`}
                    ref={bodyRef}
                >
                    {isLoading ? (
                        <Loading className={styles.loading} />
                    ) : (
                        children
                    )}
                </div>
            </div>
        </Overlay>
    );
};

export default Modal;
