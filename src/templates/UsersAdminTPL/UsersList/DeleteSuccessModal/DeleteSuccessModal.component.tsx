import { FC } from 'react';
import { TiUserDeleteOutline } from 'react-icons/ti';
import Table, {
    RowItem,
    TableRow,
} from '@/components/blocks/Table/Table.component';
import ModalSheet from '@/components/interactive/ModalSheet/ModalSheet.component';
import { DELETE_SUCCESS_MODAL_TITLES } from '@/templates/UsersAdminTPL/UsersList/DeleteSuccessModal/DeleteSuccessModal.config';
import { DeleteSuccessModalPropsIF } from '@/templates/UsersAdminTPL/UsersList/DeleteSuccessModal/DeleteSuccessModal.types';

const DeleteSuccessModal: FC<DeleteSuccessModalPropsIF> = ({
    data,
    onClose,
    isOpen,
}) => {
    const { result, reAssignedUser } = data || {};

    if (!isOpen) {
        return null;
    }

    return (
        <ModalSheet
            closeHandler={onClose}
            isLoading={!data}
            dataTest="delete_success_modal"
        >
            <div className="flcol gapLayout">
                {/*//TODO*/}
                <div className="title">
                    <TiUserDeleteOutline />
                    Пользователи удалены
                </div>
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
        </ModalSheet>
    );
};

export default DeleteSuccessModal;
