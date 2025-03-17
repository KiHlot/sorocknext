'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCheckmark, IoMailOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';
import { parseResponse } from '@/store/functions';
import { authApi } from '@/api/auth/auth';
import { SUCCESS_NOTIFY } from '@/helpers/codes';
import { getStorageItem, setStorageItem } from '@/helpers/utils';
import InfoBlock from '@/components/blocks/InfoBlock/InfoBlock.component';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import CodeInput from '@/components/form/CodeInput/CodeInput.component';
import {
    INPUT_NAMES,
    schema,
} from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.config';
import styles from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.module.scss';
import { FieldsNames } from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.types';
import { ProfileIF } from '@/types/user';

const SendConfirmCodeForm: FC = () => {
    const [
        sendConfirmUserCodeMail,
        { isLoading: isSendConfirmUserCodeMail, isSuccess },
    ] = authApi.useSendConfirmUserCodeMailMutation();
    const [confirmUser, { isLoading: isConfirmUserLoading }] =
        authApi.useConfirmUserMutation();

    const [isDisabled, setIsDisabled] = useState<boolean>(false);

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

    const confirmCode = watch('confirmCode')
    
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
                setStorageItem(
                    {
                        ...getStorageItem<ProfileIF>('profileData'),
                        isActivated: true,
                    },
                    'profileData',
                );
                reset();
                toast.success(SUCCESS_NOTIFY.s103);
                redirect('/profile');
            },
            setError,
        );
    };

    useEffect(() => {
        setIsDisabled(isSendConfirmUserCodeMail || isConfirmUserLoading);
    }, [isSendConfirmUserCodeMail, isConfirmUserLoading, confirmCode]);

    return (
        <form className="flcol gap" onSubmit={handleSubmit(onSubmit)}>
            <InfoBlock variant="info">
                Введите код подтверждения,который был отправлен на вашу почту.
            </InfoBlock>
            <CodeInput
                names={INPUT_NAMES}
                setValue={(name, code) => setValue(name, code)}
                name="confirmCode"
                control={control}
                isDisabled={isDisabled}
                clearErrors={clearErrors}
            />
            <div className={styles.buttonsLine}>
                <MainButton
                    type="submit"
                    icon={<IoCheckmark />}
                    variant="green"
                    disabled={
                        confirmCode.length !== INPUT_NAMES.length ||
                        isDisabled
                    }
                >
                    Подтвеодить
                </MainButton>
                {!isSuccess && (
                    <MainButton
                        icon={<IoMailOutline />}
                        variant="info"
                        clickHandler={sendMail}
                        disabled={isDisabled}
                    >
                        Отправить код на почту
                    </MainButton>
                )}
            </div>
        </form>
    );
};

export default SendConfirmCodeForm;
