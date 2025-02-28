import { FC, useEffect, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import { IoAlertCircleOutline } from '~/react-icons/io5';
import { usersApi } from '@/api/users/users';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import Modal from '@/components/main/Modal/Modal.component';
import { UserDetailModalPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.types';

const UserDetailModal: FC<UserDetailModalPropsIF> = ({ disabled, useId }) => {
    const [getUserData, { data: userData, isLoading }] =
        usersApi.useGetUserDataMutation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { metrics } = userData?.data || {};

    useEffect(() => {
        if (!isOpen || !useId) return;

        getUserData(useId);
    }, [useId, isOpen]);
    //TODO metrics
    return useId ? (
        <>
            <MainButton
                clickHandler={() => setIsOpen(true)}
                variant="sq"
                disabled={disabled || isLoading}
                icon={<CgDetailsMore />}
            />
            <Modal
                title={{
                    label: `${metrics?.firstName} ${metrics?.lastName}`,
                    icon: <IoAlertCircleOutline />,
                }}
                isOpen={isOpen}
                closeHandler={() => setIsOpen(false)}
                size="large"
                isLoading={isLoading}
            >
                {metrics?.lastName}
            </Modal>
        </>
    ) : null;
};

export default UserDetailModal;
