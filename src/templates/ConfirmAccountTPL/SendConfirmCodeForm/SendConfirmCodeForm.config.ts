import * as yup from 'yup';
import { ERRORS } from '@/helpers/codes';

export const INPUT_NAMES = ['i0', 'i1', 'i2', 'i3', 'i4', 'i5'];

export const schema = yup.object().shape({
    confirmCode: yup
        .string()
        .required(ERRORS.er200)
        .length(INPUT_NAMES.length, `Введите ${INPUT_NAMES.length} цифр!`),
});
