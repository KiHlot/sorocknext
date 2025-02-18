import { FC, useEffect, useState } from 'react';
import { RxQuestionMark } from 'react-icons/rx';
import styles from '@/components/elems/MainButton/DialogModal/DialogModal.module.scss';
import { DialogModalPropsIF } from '@/components/elems/MainButton/DialogModal/DialogModal.types';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import Modal from '@/components/main/Modal/Modal.component';

const DialogModal: FC<DialogModalPropsIF> = ({
    dialogText,
    clickHandler,
    open,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    return (
        <Modal
            title={{
                label: 'Уверен?',
                icon: <RxQuestionMark />,
            }}
            isOpen={isOpen}
            closeHandler={() => setIsOpen(false)}
        >
            <div className={styles.content}>{dialogText}</div>
            <div className={styles.buttonsList}>
                <MainButton clickHandler={clickHandler}>Да</MainButton>
                <MainButton clickHandler={() => setIsOpen(false)}>
                    Нет
                </MainButton>
            </div>
        </Modal>
    );
};

export default DialogModal;
