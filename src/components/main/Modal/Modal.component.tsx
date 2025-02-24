import { FC, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
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
                <div className={styles.modalHeader}>
                    {title?.label && (
                        <div className={styles.title}>
                            {title?.icon && title.icon}
                            <span>{title.label}</span>
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className={`flc ${styles.closeButton}`}
                        type="button"
                    >
                        <IoClose />
                    </button>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    ) : null;
};

export default Modal;
