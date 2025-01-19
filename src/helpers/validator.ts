import { ValidatorT } from '@/types/common';

export const VALIDATORS: ValidatorT = {
    phrase: {
        minLength: 3,
        maxLength: 30,
    },
    name: {
        minLength: 2,
        maxLength: 30,
    },
    surname: {
        minLength: 2,
        maxLength: 30,
    },
    password: {
        minLength: 8,
        maxLength: 30,
    },
    email: {
        minLength: 8,
        maxLength: 100,
    },
    image: {
        maxSize: 2,
        accept: ['image/png', 'image/jpeg', 'image/jpg'],
    },
};
