'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoCheckmark, IoMailOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { CurrentUserIF } from '@/types/user';
import { authApi } from '@/api/auth/auth';
import { SUCCESS_NOTIFY } from '@/helpers/validation/validation.config';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import {
    getSessionStorageItem,
    setSessionStorageItem,
} from '@/helpers/storage/storage.helpers';
import { STORAGE_KEYS } from '@/helpers/storage/storage.config';
import CodeInput from '@/components/controls/CodeInput/CodeInput.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import {
    INPUT_NAMES,
    schema,
} from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.config';
import styles from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.module.scss';
import { FieldsNames } from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.types';

const SendConfirmCodeForm: FC = () => {
    const [
        sendConfirmUserCodeMail,
        {
            data: sendConfirmUserCodeMailData,
            isLoading: isSendConfirmUserCodeMail,
        },
    ] = authApi.useSendConfirmUserCodeMailMutation();
    const [confirmUser, { isLoading: isConfirmUserLoading }] =
        authApi.useConfirmUserMutation();

    const {
        handleSubmit,
        control,
        reset,
        setError,
        setValue,
        clearErrors,
        watch,
    } = useForm<{ confirmCode: string }>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const confirmCode = watch('confirmCode');

    const sendMail = async () => {
        const { result } = await sendConfirmUserCodeMail().unwrap();

        if (result === 'ok') {
            toast.success(SUCCESS_NOTIFY.s102);
        }
    };

    const onSubmit = async ({ confirmCode }: { confirmCode: string }) => {
        const data = await confirmUser(confirmCode).unwrap();

        parseResponse<FieldsNames>(
            data,
            () => {
                const storageData = getSessionStorageItem<CurrentUserIF>(
                    STORAGE_KEYS.CurrentUser,
                );
                if (storageData) {
                    setSessionStorageItem<CurrentUserIF>(
                        STORAGE_KEYS.CurrentUser,
                        {
                            ...storageData,
                            isActivated: true,
                        },
                    );
                }

                reset();
                toast.success(SUCCESS_NOTIFY.s103);
                redirect('/profile');
            },
            setError,
        );
    };

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <InfoBlock variant="info">
                Введите код подтверждения, который был отправлен на вашу почту.
            </InfoBlock>
            <CodeInput
                names={INPUT_NAMES}
                setValue={(name, code) => setValue(name, code)}
                name="confirmCode"
                control={control}
                isDisabled={isConfirmUserLoading}
                clearErrors={clearErrors}
            />
            <div className={styles.buttonsLine}>
                <MainButton
                    type="submit"
                    icon={<IoCheckmark />}
                    isLoading={isConfirmUserLoading}
                    disabled={confirmCode?.length !== INPUT_NAMES.length}
                >
                    Подтвердить
                </MainButton>
                {!sendConfirmUserCodeMailData && (
                    <MainButton
                        icon={<IoMailOutline />}
                        clickHandler={sendMail}
                        isLoading={isSendConfirmUserCodeMail}
                    >
                        Отправить код на почту
                    </MainButton>
                )}
            </div>
        </form>
    );
};

export default SendConfirmCodeForm;
