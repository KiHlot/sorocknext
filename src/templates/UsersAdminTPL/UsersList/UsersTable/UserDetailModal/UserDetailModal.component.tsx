import { FC, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import { IoAlertCircleOutline } from '~/react-icons/io5';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import Modal from '@/components/main/Modal/Modal.component';
import { UserDetailModalPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.types';

const UserDetailModal: FC<UserDetailModalPropsIF> = ({ disabled }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <MainButton
                clickHandler={() => setIsOpen(true)}
                variant="sq"
                disabled={disabled}
            >
                <CgDetailsMore />
            </MainButton>
            <Modal
                title={{
                    label: 'Информация о юзере: /username/',
                    icon: <IoAlertCircleOutline />,
                }}
                isOpen={isOpen}
                closeHandler={() => setIsOpen(false)}
                size="large"
            >
                UserDetailModal
            </Modal>
        </>
    );
};

export default UserDetailModal;
