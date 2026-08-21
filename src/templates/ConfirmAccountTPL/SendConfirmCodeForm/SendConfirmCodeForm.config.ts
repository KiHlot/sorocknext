import * as yup from 'yup';
import { ERRORS } from '@/helpers/validation/validation.config';

export const INPUT_NAMES = ['i0', 'i1', 'i2', 'i3', 'i4', 'i5'];

export const schema = yup.object().shape({
    confirmCode: yup
        .string()
        .required(ERRORS_CODES.er200)
        .length(INPUT_NAMES.length, `Введите ${INPUT_NAMES.length} цифр!`),
});
