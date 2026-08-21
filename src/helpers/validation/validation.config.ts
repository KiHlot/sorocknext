import {
    ValidatorFieldT,
    ValidatorFileT,
} from '@/helpers/validation/validation.types';

export const VALIDATOR_FIELDS = {
    Phrase: 'phrase',
    Name: 'name',
    Surname: 'surname',
    Password: 'password',
    Email: 'email',
    Message: 'message',
} as const;

export const VALIDATOR_FILES = {
    Image: 'image',
} as const;

export const VALIDATOR_FILE: ValidatorFileT = {
    image: {
        maxSize: 2,
        accept: ['image/png', 'image/jpeg', 'image/jpg'],
    },
};

export const VALIDATOR_FIELD: ValidatorFieldT = {
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
    message: {
        minLength: 10,
        maxLength: 200,
    },
};
