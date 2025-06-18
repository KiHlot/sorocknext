'use client';

import { FC, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout.component';
import Block from '@/components/blocks/Block/Block.component';
import ButtonsGroup from '@/components/interactive/ButtonsGroup/ButtonsGroup.component';
import { AUTH_TPL_CONFIG } from '@/templates/AuthTPL/AuthTPL.config';
import styles from '@/templates/AuthTPL/AuthTPL.module.scss';
import LoginForm from '@/templates/AuthTPL/LoginForm/LoginForm.component';
import RegistrationForm from '@/templates/AuthTPL/RegistrationForm/RegistrationForm.component';
import ResetPassword from '@/templates/AuthTPL/ResetPassword/ResetPassword.component';

const AuthTPL: FC = () => {
    const pathname = usePathname();

    const [slug, setSlug] = useState<string | null>(null);

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        setSlug(pathSegments[pathSegments.length - 1]);
    }, [pathname]);

    return slug ? (
        <AuthLayout>
            <ButtonsGroup
                config={AUTH_TPL_CONFIG}
                controls={{
                    activeTab: slug,
                }}
                fullWidth
            />
            <Block className={`flcol ${styles.block}`}>
                <div className={`flc ${styles.title}`}>
                    {AUTH_TPL_CONFIG.filter(({ key }) => key === slug)[0].label}
                </div>
                {slug === 'auth' && <LoginForm />}
                {slug === 'registration' && <RegistrationForm />}
                {slug === 'reset-password' && <ResetPassword />}
            </Block>
        </AuthLayout>
    ) : null;
};

export default AuthTPL;
