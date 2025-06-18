import { FC, useEffect, useState } from 'react';
import { CgDetailsMore } from 'react-icons/cg';
import { IoAlertCircleOutline } from '~/react-icons/io5';
import { usersApi } from '@/api/users/users';
import Block from '@/components/blocks/Block/Block.component';
import Author from '@/components/elems/Author/Author.component';
import Country from '@/components/elems/Country/Country.component';
import Img from '@/components/elems/Img/Img.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import Modal from '@/components/interactive/Modal/Modal.component';
import DetailRow from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/DetailRow/DetailRow.component';
import styles from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.module.scss';
import { UserDetailModalPropsIF } from '@/templates/UsersAdminTPL/UsersList/UsersTable/UserDetailModal/UserDetailModal.types';

const UserDetailModal: FC<UserDetailModalPropsIF> = ({ disabled, useId }) => {
    const [getUserData, { data: userData, isLoading }] =
        usersApi.useGetUserDataMutation();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {
        metrics,
        contacts,
        avatarUrl,
        userId,
        userUrl,
        userLogin,
        role,
        socLinks,
        activity,
    } = userData?.data || {};

    useEffect(() => {
        if (!isOpen || !useId) return;

        getUserData(useId);
    }, [useId, isOpen]);

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
                isLoading={isLoading || !userData?.data}
            >
                <div className={`flcol ${styles.modalLayout}`}>
                    <div className={styles.row}>
                        <Block
                            className={`flcol ${styles.block} ${styles.avatarBlock}`}
                        >
                            <Img
                                className={styles.avatar}
                                url={avatarUrl}
                                type="user500"
                            />
                            <Author
                                type="name"
                                data={{
                                    url: userUrl,
                                    fullName: `${metrics?.firstName} ${metrics?.lastName}`,
                                }}
                            />
                            <Country
                                className={styles.country}
                                value={metrics?.country}
                            />
                        </Block>
                        <Block className={`flcol ${styles.block}`}>
                            <DetailRow label="ID">{userId}</DetailRow>
                            <DetailRow label="Роль">{role}</DetailRow>
                            <DetailRow label="Логин">{userLogin}</DetailRow>
                            <DetailRow label="Город">{metrics?.city}</DetailRow>
                            <DetailRow label="Дата рождения">
                                {metrics?.birthdate}
                            </DetailRow>
                        </Block>
                        <Block className={`flcol ${styles.block}`}>
                            <DetailRow label="Публичный email">
                                {contacts?.emailPublic}
                            </DetailRow>
                            <DetailRow label="Телефон">
                                {contacts?.phone}
                            </DetailRow>
                            <DetailRow label="Телеграм">
                                {contacts?.tgLogin}
                            </DetailRow>
                            <DetailRow label="Whatsapp">
                                {contacts?.waLogin}
                            </DetailRow>
                            {socLinks &&
                                Object.entries(socLinks).map(([key, value]) => (
                                    <DetailRow
                                        key={key}
                                        label={`Соцсеть ${key}`}
                                    >
                                        <>{value}</>
                                    </DetailRow>
                                ))}
                        </Block>
                    </div>
                    <div className={styles.row}>
                        <Block className={`flcol ${styles.block}`}>
                            <DetailRow label="Зарегистрирован">
                                {activity?.registrationDate}
                            </DetailRow>
                            <DetailRow label="Активирован">
                                {activity?.isActivated ? 'Да' : 'Нет'}
                            </DetailRow>
                            <DetailRow label="Активность">
                                {activity?.lastActivity}
                            </DetailRow>
                            <DetailRow label="Куки">
                                {activity?.isCookieAccepted ? 'Да' : 'Нет'}
                            </DetailRow>
                        </Block>
                        <Block className={`flcol ${styles.block}`}>Инфа2</Block>
                        <Block className={`flcol ${styles.block}`}>Инфа3</Block>
                    </div>
                </div>
            </Modal>
        </>
    ) : null;
};

export default UserDetailModal;
