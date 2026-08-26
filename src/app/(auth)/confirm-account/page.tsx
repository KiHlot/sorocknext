import { ReactElement } from 'react';
import { Metadata } from 'next';
import { PiUserCheck } from 'react-icons/pi';
import { fetchApi } from '@/helpers/fetchApi';
import Block from '@/components/blocks/Block/Block.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import ConfirmAccountWidget from '@/components/widgets/ConfirmAccountWidget/ConfirmAccountWidget.component';
import authStyles from '@/app/(auth)/auth.module.scss';
import { ConfirmAccountPagePropsIF } from '@/app/(auth)/confirm-account/page.types';

export const metadata: Metadata = {
    title: 'Подтверждение аккаунта',
    description: 'Подтверждение аккаунта',
};

export default async function ConfirmAccountPage({
    searchParams,
}: ConfirmAccountPagePropsIF): Promise<ReactElement> {
    const params = await searchParams;
    const { email, confirmCode } = params || {};
    const getParams =
        email && confirmCode
            ? `?email=${email}&confirmCode=${confirmCode}`
            : '';

    const data = await fetchApi<{ isConfirmed: boolean }>(
        `/auth/confirm-email${getParams}`,
    );

    return (
        <Block className={`flcol ${authStyles.block}`}>
            <div className={`flc ${authStyles.title}`}>
                <PiUserCheck />
                <h1>Подтверждение аккаунта</h1>
            </div>
            {data?.isConfirmed ? (
                <InfoBlock variant="info">Ваш аккаунт подтвержден!</InfoBlock>
            ) : (
                <ConfirmAccountWidget />
            )}
        </Block>
    );
}
