import { FC } from 'react';
import Block from '@/components/blocks/Block/Block.component';
import Button from '@/components/controls/Button/Button.component';
import MainLogo from '@/components/elems/MainLogo/MainLogo.component';
import styles from '@/components/widgets/LoginWidget/LoginWidget.module.scss';

const LoginWidget: FC = () => (
    <Block className={`${styles.loginWidgetWrapper} flcol gapBlock`}>
        <div className={`flc ${styles.logoWrapper}`}>
            <MainLogo className={styles.logo} />
        </div>
        <div className={`flcol ${styles.titleWrapper}`}>
            <h1 className={styles.title}>Развлекательный портал</h1>
            <div className={styles.subTitle}>sorock.ru</div>
        </div>
        <div className={styles.content}>
            Добро пожаловать на наш развлекательный портал. Вы можете войти в
            свой аккаунт или создать новый
        </div>
        <Button
            variant="accent"
            href="/login"
            className={styles.button}
            dataTest="login_widget_enter"
        >
            Войти
        </Button>
    </Block>
);

export default LoginWidget;
