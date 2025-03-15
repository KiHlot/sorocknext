import * as yup from 'yup';
import { ERRORS } from '@/helpers/codes';
import { VALIDATORS } from '@/helpers/validator';

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
    name: yup
        .string()
        .required(ERRORS.er200)
        .min(
            VALIDATORS.name.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.name.minLength}`,
        )
        .max(
            VALIDATORS.name.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.name.maxLength}`,
        ),
    message: yup
        .string()
        .required(ERRORS.er200)
        .min(
            VALIDATORS.message.minLength!,
            `${ERRORS.er201}. Мин: ${VALIDATORS.message.minLength}`,
        )
        .max(
            VALIDATORS.message.maxLength!,
            `${ERRORS.er202}. Макс: ${VALIDATORS.message.maxLength}`,
        ),
});
