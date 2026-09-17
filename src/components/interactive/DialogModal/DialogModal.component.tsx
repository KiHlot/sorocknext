import { FC } from 'react';
import { CgClose } from 'react-icons/cg';
import {
    IoAlertCircleOutline,
    IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/interactive/DialogModal/DialogModal.module.scss';
import { DialogModalPropsIF } from '@/components/interactive/DialogModal/DialogModal.types';
import ModalSheet from '@/components/interactive/ModalSheet/ModalSheet.component';

const DialogModal: FC<DialogModalPropsIF> = ({
    dialogText,
    clickHandler,
    isOpen,
    setIsOpen,
}) => {
    const accept = (): void => {
        clickHandler();
        setIsOpen(false);
    };
    {
        /*//TODO*/
    }
    if (!isOpen) {
        return null;
    }

    return (
        <ModalSheet
            closeHandler={() => setIsOpen(false)}
            size="small"
            dataTest="dialog_modal"
        >
            {/*//TODO*/}
            <div className="title">
                <IoAlertCircleOutline />
                Вы уверены?
            </div>
            <div className={styles.content}>{dialogText}</div>
            <div className={styles.buttonsList}>
                <Button
                    clickHandler={() => setIsOpen(false)}
                    className={styles.decline}
                    dataTest="dialog_modal_decline"
                >
                    <CgClose />
                    Нет
                </Button>
                <Button
                    clickHandler={accept}
                    className={styles.accept}
                    dataTest="dialog_modal_accept"
                >
                    <IoShieldCheckmarkOutline />
                    Да
                </Button>
            </div>
        </ModalSheet>
    );
};

export default DialogModal;
