'use client';

import { FC, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { siteApi } from '@/api/site/site';
import { ContactFormIF } from '@/api/site/types';
import { parseResponse } from '@/helpers/fetchRestApi/fetchRestApi.helpers';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import { catchError } from '@/helpers/validation/error/error.helpers';
import { VALIDATOR_FIELD } from '@/helpers/validation/validation.config';
import Button from '@/components/controls/Button/Button.component';
import { Input } from '@/components/controls/Input/Input.component';
import TextArea from '@/components/controls/TextArea/TextArea.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import { schema } from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.config';
import { FieldsNames } from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.types';

const ContactForm: FC = () => {
    const [sendContactForm, { isLoading }] =
        siteApi.useSendContactFormMutation();

    const [isSent, setIsSent] = useState(false);

    const {
        handleSubmit,
        control,
        setError,
        formState: { isValid },
    } = useForm<ContactFormIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: ContactFormIF): Promise<void> => {
        try {
            const result = await sendContactForm(values).unwrap();

            parseResponse(result, ({ data, errors }) => {
                if (errors?.length) {
                    for (const { code, fieldName } of errors) {
                        if (fieldName && code) {
                            setError(fieldName as FieldsNames, {
                                type: 'manual',
                                message: ERRORS_CODES[code],
                            });
                        }
                    }

                    return;
                }

                if (data?.isSent) {
                    setIsSent(true);
                    return;
                }

                toast.error(ERRORS_CODES.er224);
            });
        } catch (error) {
            const { message } = catchError(error);
            toast.error(message);
        }
    };

    if (isSent) {
        return <InfoBlock variant="success">{SUCCESS_CODES.s106}</InfoBlock>;
    }

    return (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <Input
                name="name"
                label="Имя"
                control={control}
                isRequired
                isDisabled={isLoading}
                maxLength={VALIDATOR_FIELD.name.maxLength}
            />
            <Input
                name="email"
                label="Email"
                control={control}
                isRemoveSpaces
                isRequired
                isDisabled={isLoading}
                maxLength={VALIDATOR_FIELD.email.maxLength}
            />
            <TextArea
                name="message"
                label="Ваше сообщение"
                control={control}
                isRequired
                isDisabled={isLoading}
                maxLength={VALIDATOR_FIELD.message.maxLength}
            />
            <Button
                type="submit"
                variant="secondary"
                isLoading={isLoading}
                disabled={!isValid}
                dataTest="contact_form_submit_button"
            >
                Отправить
            </Button>
        </form>
    );
};

export default ContactForm;
