import { ValueOfT } from '@/types/common';
import { RESET_PASSWORD_STEPS } from '@/components/widgets/ResetPasswordWidget/ResetPasswordWidget.config';

export type ResetPasswordStepT = ValueOfT<typeof RESET_PASSWORD_STEPS>;
