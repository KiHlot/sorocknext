import * as yup from 'yup';
import { VALIDATORS } from '@/helpers/validator';
import { ERRORS } from '@/configs/codes';

export const schema = yup.object().shape({
    email: yup
        .string()
        .required(ERRORS.er200)
        .email(ERRORS.er203)
        .min(
            VALIDATORS.email.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.email.minLength}`,
        )
        .max(
            VALIDATORS.email.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.email.maxLength}`,
        ),
});
