import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '~/@hookform/resolvers/yup';
import { parseResponse } from '@/store/functions';
import { siteApi } from '@/api/site/site';
import { ContactFormIF } from '@/api/site/types';
import InfoBlock from '@/components/blocks/InfoBlock/InfoBlock.component';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import { Input } from '@/components/form/Input/Input.component';
import TextArea from '@/components/form/TextArea/TextArea.component';
import { schema } from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.config';
import styles from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.module.scss';
import { FieldsNames } from '@/components/sections/Footer/TopFooter/ContactForm/ContactForm.types';

const ContactForm: FC = () => {
    const [sendContactForm, { data: result, isLoading, isSuccess }] =
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
        <form
            className={`form ${styles.contactFormWrapper}`}
            onSubmit={handleSubmit(onSubmit)}
        >
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
                variant="light"
                disabled={isLoading || isSuccess}
            >
                Отправить
            </MainButton>
        </form>
    );
};

export default ContactForm;
