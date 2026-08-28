import { ValueOfT } from '@/types/common';
import { CONFIRM_ACCOUNT_WIDGET_STEPS } from '@/components/widgets/ConfirmAccountWidget/ConfirmAccountWidget.config';

export type ConfirmAccountWidgetStepT = ValueOfT<
    typeof CONFIRM_ACCOUNT_WIDGET_STEPS
>;
