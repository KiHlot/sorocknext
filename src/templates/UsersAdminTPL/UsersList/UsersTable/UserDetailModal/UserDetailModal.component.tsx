import { FC, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.module.scss';
import { UserDetailModalPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.types';

const UserDetailModal: FC<UserDetailModalPropsIF> = ({ disabled }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <MainButton clickHandler={() => setIsOpen(true)} variant="sq" disabled={disabled}>
                <CgDetailsMore />
            </MainButton>
            <div className="modal"></div>
        </>
    );
};

export default UserDetailModal;
