import { FC, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import Loading from '@/components/elems/Loading/Loading.component';
import styles from '@/components/interactive/Modal/Modal.module.scss';
import { ModalPropsIF } from '@/components/interactive/Modal/Modal.types';

const Modal: FC<ModalPropsIF> = ({
    isOpen,
    children,
    title,
    closeHandler,
    blockOutsideClick = false,
    isLoading,
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
        if (blockOutsideClick) {
            return;
        }
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
                        <>
                            {isLoading ? (
                                <div>Загружаем...</div>
                            ) : (
                                <div className={styles.title}>
                                    {title?.icon && title.icon}
                                    <span>{title.label}</span>
                                </div>
                            )}
                        </>
                    )}
                    <button
                        onClick={onClose}
                        className={`flc ${styles.closeButton}`}
                        type="button"
                    >
                        <IoClose />
                    </button>
                </div>
                <div className={styles.body}>
                    {isLoading ? <Loading /> : children}
                </div>
            </div>
        </div>
    ) : null;
};

export default Modal;
