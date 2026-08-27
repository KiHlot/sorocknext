import { ReactElement } from 'react';
import { TbArrowBackUp } from 'react-icons/tb';
import Block from '@/components/blocks/Block/Block.component';
import ResetPasswordWidget from '@/components/widgets/ResetPasswordWidget/ResetPasswordWidget.component';
import authStyles from '@/app/(auth)/auth.module.scss';

export default function ResetPasswordPage(): ReactElement {
    return (
        <Block className={`flcol ${authStyles.block}`}>
            <div className={`flc ${authStyles.title}`}>
                <TbArrowBackUp />
                <h1>Сброс пароля</h1>
            </div>
            <ResetPasswordWidget />
        </Block>
    );
}
