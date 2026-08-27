import { ValueOf } from '@/types/common';
import { RESET_PASSWORD_STEPS } from '@/components/widgets/ResetPasswordWidget/ResetPasswordWidget.config';

export type ResetPasswordStepT = ValueOf<typeof RESET_PASSWORD_STEPS>;
