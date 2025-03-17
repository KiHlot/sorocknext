'use client';

import { FC, useState } from 'react';
import ButtonsGroup from '@/components/main/ButtonsGroup/ButtonsGroup.component';
import { RESET_PASS_BUTTONS } from '@/templates/AuthTPL/ResetPassword/ResetPassword.config';
import {
    ActiveTabT,
    ResetPasswordPropsIF,
} from '@/templates/AuthTPL/ResetPassword/ResetPassword.types';
import ResetPasswordForm from '@/templates/AuthTPL/ResetPassword/ResetPasswordForm/ResetPasswordForm.component';
import SendResetPasswordMailForm from '@/templates/AuthTPL/ResetPassword/SendResetPasswordMailForm/SendResetPasswordMailForm.component';

const ResetPassword: FC<ResetPasswordPropsIF> = ({ className = '' }) => {
    const [activeTab, setActiveTab] = useState<ActiveTabT>('mail');

    return (
        <div className={`flcol gap ${className}`}>
            <ButtonsGroup
                config={RESET_PASS_BUTTONS}
                controls={{
                    activeTab,
                    setActiveTab: (key: string) =>
                        setActiveTab(key as ActiveTabT),
                }}
                fullWidth
            />

            {activeTab === 'mail' ? (
                <SendResetPasswordMailForm
                    callback={() => setActiveTab('code')}
                />
            ) : (
                <ResetPasswordForm />
            )}
        </div>
    );
};

export default ResetPassword;
