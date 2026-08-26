'use client';

import { FC } from 'react';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import SendConfirmCodeForm from '@/components/widgets/ConfirmAccountWidget/SendConfirmCodeForm/SendConfirmCodeForm.component';

const ConfirmAccountWidget: FC = () => (
    <div className="flcol gapBlock">
        <InfoBlock title="Подтверждение аккаунта" variant="info">
            Введите email, указанный при регистрации. На него придёт ссылка для
            подтверждения - просто перейдите по ней.
        </InfoBlock>
        <SendConfirmCodeForm />
    </div>
);

export default ConfirmAccountWidget;
