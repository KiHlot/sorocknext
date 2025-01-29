import { FC, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import styles from '@/components/main/Modal/Modal.module.scss';
import { ModalPropsIF } from '@/components/main/Modal/Modal.types';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const Modal: FC<ModalPropsIF> = ({
    isOpen,
    children,
    title,
    closeHandler,
    blockOutsideClick = false,
    size = 'default',
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const normalizeHtml = (isOpen: boolean) => {
        if (isOpen) {
            document.body.classList.add('ovh', 'hide');
        } else {
            document.body.classList.remove('ovh', 'hide');
        }
    };

    const onClose = () => {
        if (blockOutsideClick) return;
        normalizeHtml(false);
        closeHandler();
    };

    useEffect(() => {
        normalizeHtml(isOpen);
        return () => {
            normalizeHtml(false);
        };
    }, [isOpen]);

    useOutsideClick(modalRef, onClose);

    return isOpen ? (
        <div className={styles.overlay}>
            <div
                className={`${styles.modalWrapper} ${styles[size]}`}
                ref={modalRef}
            >
                {title && (
                    <div className={styles.title}>
                        {title.icon}
                        <span>{title.label}</span>
                    </div>
                )}
                <MainButton
                    clickHandler={onClose}
                    variant="default"
                    className={`flc ${styles.closeButton}`}
                >
                    <IoClose />
                </MainButton>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null;
};

export default Modal;
