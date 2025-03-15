'use client';

import { FC, FormEvent, useEffect, useState } from 'react';
import { IoCheckmark, IoMailOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { authApi } from '@/api/auth/auth';
import { SUCCESS_NOTIFY } from '@/helpers/codes';
import { getStorageItem, setStorageItem } from '@/helpers/utils';
import InfoBlock from '@/components/blocks/InfoBlock/InfoBlock.component';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import SendCode from '@/components/form/SendCode/SendCode.component';
import { INPUT_NAMES } from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.config';
import styles from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.module.scss';
import { ProfileIF } from '@/types/user';

const SendConfirmCodeForm: FC = () => {
    const router = useRouter();

    const [code, setCode] = useState<string>('');
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const [
        sendConfirmUserCodeMail,
        { isLoading: isSendConfirmUserCodeMail, isSuccess },
    ] = authApi.useSendConfirmUserCodeMailMutation();
    const [confirmUser, { isLoading: isConfirmUserLoading }] =
        authApi.useConfirmUserMutation();

    useEffect(() => {
        setIsDisabled(isSendConfirmUserCodeMail || isConfirmUserLoading);
    }, [isSendConfirmUserCodeMail, isConfirmUserLoading]);

    const sendMail = async () => {
        const { result } = await sendConfirmUserCodeMail().unwrap();

        if (result === 'ok') {
            toast.success(SUCCESS_NOTIFY.s102);
        }
    };

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault();

        const { result } = await confirmUser(code).unwrap();

        if (result === 'ok') {
            setStorageItem(
                {
                    ...getStorageItem<ProfileIF>('profileData'),
                    isActivated: true,
                },
                'profileData',
            );
            toast.success(SUCCESS_NOTIFY.s103);
            router.refresh();
        }
    };

    return (
        <form className="flcol gap" onSubmit={submitHandler}>
            <InfoBlock variant="info">
                Введите код подтверждения,который был отправлен на вашу почту.
            </InfoBlock>
            <SendCode names={INPUT_NAMES} callback={setCode} />
            <div className={styles.buttonsLine}>
                <MainButton
                    type="submit"
                    icon={<IoCheckmark />}
                    variant="green"
                    disabled={code.length !== INPUT_NAMES.length || isDisabled}
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
