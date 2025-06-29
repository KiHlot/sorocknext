'use client';

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '~/@hookform/resolvers/yup';
import { siteApi } from '@/api/site/site';
import { ContactFormIF } from '@/api/site/types';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import TextArea from '@/components/controls/TextArea/TextArea.component';
import InfoBlock from '@/components/interactive/InfoBlock/InfoBlock.component';
import { schema } from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.config';
import { FieldsNames } from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.types';
import { parseResponse } from '@/store/functions';

const ContactForm: FC = () => {
    const [sendContactForm, { data: result, isLoading }] =
        siteApi.useSendContactFormMutation();

    const [isSent, setIsSent] = useState<boolean>(false);

    const { handleSubmit, control, setError } = useForm<ContactFormIF>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
    });

    const onSubmit = async (values: ContactFormIF): Promise<void> => {
        sendContactForm(values)
            .unwrap()
            .then(data => {
                parseResponse<FieldsNames, { isSent: boolean }>(
                    data,
                    data => {
                        setIsSent(!!data);
                    },
                    setError,
                );
            });
    };

    return isSent ? (
        <InfoBlock variant={result?.data?.isSent ? 'success' : 'error'}>
            {result?.data?.isSent
                ? 'Ваше письмо успешно отправлено!'
                : 'Мы не смогли отправить ваше письмо, попробуйте немного позже!'}
        </InfoBlock>
    ) : (
        <form className="flcol gapBlock" onSubmit={handleSubmit(onSubmit)}>
            <Input name="name" label="Имя" control={control} isRequired />
            <Input
                name="email"
                label="Email"
                control={control}
                isRemoveSpaces
                isRequired
            />
            <TextArea
                name="message"
                label="Ваше сообщение"
                control={control}
                isRequired
            />
            <MainButton
                type="submit"
                variant="secondary"
                isLoading={isLoading}
                disabled={!!result}
            >
                Отправить
            </MainButton>
        </form>
    );
};

export default ContactForm;
