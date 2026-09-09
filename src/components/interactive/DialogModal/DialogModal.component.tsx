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

    return (
        <ModalSheet
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
                <Button
                    clickHandler={() => setIsOpen(false)}
                    className={styles.decline}
                    dataTest="dialog_modal_decline_button"
                >
                    <CgClose />
                    Нет
                </Button>
                <Button
                    clickHandler={accept}
                    className={styles.accept}
                    dataTest="dialog_modal_accept_button"
                >
                    <IoShieldCheckmarkOutline />
                    Да
                </Button>
            </div>
        </ModalSheet>
    );
};

export default DialogModal;
