import * as yup from 'yup';
import { ERRORS } from '@/helpers/codes';
import { VALIDATORS } from '@/helpers/validator';

export const schema = yup.object().shape({
    username: yup
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
    password: yup
        .string()
        .required(ERRORS.er200)
        .min(
            VALIDATORS.password.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.password.minLength}`,
        )
        .max(
            VALIDATORS.password.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.password.maxLength}`,
        ),
});
