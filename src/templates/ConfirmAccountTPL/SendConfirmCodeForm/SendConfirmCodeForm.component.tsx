'use client';

import { FC, useState } from 'react';
import { IoCheckmark, IoMailOutline } from 'react-icons/io5';
import MainButton from '@/components/elems/MainButton/MainButton.component';
import SendCode from '@/components/form/SendCode/SendCode.component';
import { INPUT_NAMES } from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.config';
import styles from '@/templates/ConfirmAccountTPL/SendConfirmCodeForm/SendConfirmCodeForm.module.scss';

const SendConfirmCodeForm: FC = () => {
    const [code, setCode] = useState<string>('');

    return (
        <form className="flcol gap">
            <SendCode names={INPUT_NAMES} callback={() => null} />
            <div className={styles.buttonsLine}>
                <MainButton
                    type="submit"
                    icon={<IoCheckmark />}
                    variant="green"
                >
                    Подтвеодить
                </MainButton>
                <MainButton icon={<IoMailOutline />} variant="info">
                    Отправить код на почту
                </MainButton>
            </div>
        </form>
    );
};

export default SendConfirmCodeForm;
