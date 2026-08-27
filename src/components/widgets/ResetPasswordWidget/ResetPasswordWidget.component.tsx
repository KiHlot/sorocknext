'use client';

import { FC, useState } from 'react';
import ResetPasswordForm from '@/components/widgets/ResetPasswordWidget/ResetPasswordForm/ResetPasswordForm.component';
import { RESET_PASSWORD_STEPS } from '@/components/widgets/ResetPasswordWidget/ResetPasswordWidget.config';
import { ResetPasswordStepT } from '@/components/widgets/ResetPasswordWidget/ResetPasswordWidget.types';
import SendResetPasswordMailForm from '@/components/widgets/ResetPasswordWidget/SendResetPasswordMailForm/SendResetPasswordMailForm.component';

const ResetPasswordWidget: FC = () => {
    const [step, setStep] = useState<ResetPasswordStepT>(
        RESET_PASSWORD_STEPS.SetEmail,
    );
    const [email, setEmail] = useState<string | null>();

    const nextStepHandler = (email: string): void => {
        setEmail(email);
        setStep(RESET_PASSWORD_STEPS.SetNewPassword);
    };

    return (
        <div className="flcol">
            {(!email || step === RESET_PASSWORD_STEPS.SetEmail) && (
                <SendResetPasswordMailForm nextStepHandler={nextStepHandler} />
            )}
            {email && step === RESET_PASSWORD_STEPS.SetNewPassword && (
                <ResetPasswordForm email={email} />
            )}
        </div>
    );
};

export default ResetPasswordWidget;
