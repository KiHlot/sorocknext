import { FC } from 'react';
import { TiUserDeleteOutline } from 'react-icons/ti';
import { DELETE_SUCCESS_MODAL_TITLES } from '@/templates/UsersAdminTPL/UsersList/DeleteSuccessModal/DeleteSuccessModal.config';
import { DeleteSuccessModalPropsIF } from '@/templates/UsersAdminTPL/UsersList/DeleteSuccessModal/DeleteSuccessModal.types';
import Table, {
    RowItem,
    TableRow,
} from '@/components/blocks/Table/Table.component';
import Modal from '@/components/interactive/Modal/Modal.component';

const DeleteSuccessModal: FC<DeleteSuccessModalPropsIF> = ({
    data,
    onClose,
    isOpen,
}) => {
    const { result, reAssignedUser } = data || {};

    return (
        <Modal
            isOpen={isOpen}
            closeHandler={onClose}
            title={{
                icon: <TiUserDeleteOutline />,
                label: 'Пользователи удалены',
            }}
            isLoading={!data}
        >
            <div className="flcol gapLayout">
                {result?.length && (
                    <Table titles={DELETE_SUCCESS_MODAL_TITLES}>
                        {result.map(({ isDeleted, userId, fullName }) => (
                            <TableRow key={userId}>
                                <RowItem>{userId}</RowItem>
                                <RowItem>{fullName}</RowItem>
                                <RowItem>
                                    {isDeleted ? 'Успешно' : 'Ошибка'}
                                </RowItem>
                            </TableRow>
                        ))}
                    </Table>
                )}
                <span>Посты переасайнены на юзера {reAssignedUser}</span>
            </div>
        </Modal>
    );
};

export default DeleteSuccessModal;
