import { ReactElement } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import thumbBg from '@/images/img/thumb_bg.jpg';
import ButtonsGroupAuth from '@/components/blocks/ButtonsGroupAuth/ButtonsGroupAuth.component';
import authStyles from '@/app/(auth)/auth.module.scss';
import { LayoutIF } from '@/app/types';

export const metadata: Metadata = {
    title: 'Auth',
    description: 'Сделано без любви',
    icons: {
        icon: {
            url: '/favicon.svg',
            type: 'shortcut icon',
        },
    },
};

export default async function Layout({
    children,
}: LayoutIF): Promise<ReactElement> {
    return (
        <div className={authStyles.authLayout}>
            <div className={authStyles.leftSide} />
            <div className={`flcol gapLayout ${authStyles.content}`}>
                <Link href="/" className={authStyles.backButton}>
                    <IoArrowBackOutline />
                    На главную
                </Link>
                <ButtonsGroupAuth />
                {children}
            </div>
            <div
                className={`bgc ${authStyles.thumb}`}
                style={{
                    backgroundImage: `linear-gradient(
        		to left,
        		rgba(27, 32, 38, 0.4),
        		rgba(27, 32, 38, 1)), url(${thumbBg.src}`,
                }}
            />
        </div>
    );
}
