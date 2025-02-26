import { FC } from 'react';
import { CgClose } from 'react-icons/cg';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import styles from '@/components/elems/DialogModal/DialogModal.module.scss';
import { DialogModalPropsIF } from '@/components/elems/DialogModal/DialogModal.types';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import Modal from '@/components/main/Modal/Modal.component';

const DialogModal: FC<DialogModalPropsIF> = ({
    dialogText,
    clickHandler,
    isOpen,
    setIsOpen,
}) => {
    const accept = () => {
        clickHandler();
        setIsOpen(false);
    };

    return (
        <Modal
            title={{
                label: 'Вы уверены?',
                icon: <IoAlertCircleOutline />,
            }}
            isOpen={isOpen}
            closeHandler={() => setIsOpen(false)}
            size="small"
        >
            <div className={styles.content}>{dialogText}</div>
            <div className={styles.buttonsList}>
                <MainButton
                    clickHandler={() => setIsOpen(false)}
                    className={styles.decline}
                >
                    <CgClose />
                    Нет
                </MainButton>
                <MainButton clickHandler={accept} className={styles.accept}>
                    <IoShieldCheckmarkOutline />
                    Да
                </MainButton>
            </div>
        </Modal>
    );
};

export default DialogModal;
