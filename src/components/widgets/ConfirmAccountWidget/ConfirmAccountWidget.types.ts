import { ValueOf } from '@/types/common';
import { CONFIRM_ACCOUNT_WIDGET_STEPS } from '@/components/widgets/ConfirmAccountWidget/ConfirmAccountWidget.config';

export type ConfirmAccountWidgetStepT = ValueOf<
    typeof CONFIRM_ACCOUNT_WIDGET_STEPS
>;
