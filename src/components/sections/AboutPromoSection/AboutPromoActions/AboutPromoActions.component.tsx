'use client';

import { FC } from 'react';
import { IoChatboxEllipsesOutline, IoLinkOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import {
    ERRORS_CODES,
    SUCCESS_CODES,
} from '@/helpers/validation/codes/codes.config';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/sections/AboutPromoSection/AboutPromoActions/AboutPromoActions.module.scss';
import { AboutPromoActionsPropsIF } from '@/components/sections/AboutPromoSection/AboutPromoActions/AboutPromoActions.types';
import { ABOUT_PROMO_COPY } from '@/components/sections/AboutPromoSection/AboutPromoSection.config';

const handleCopyLink = async (): Promise<void> => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(SUCCESS_CODES.s107);
    } catch {
        toast.error(ERRORS_CODES.er900);
    }
};

const AboutPromoActions: FC<AboutPromoActionsPropsIF> = ({
    reviewUrl,
    className = '',
}) => (
    <div className={`${styles.actions} ${className}`}>
        <div className={styles.action}>
            <Button
                variant="primary"
                icon={<IoLinkOutline />}
                clickHandler={handleCopyLink}
                dataTest={ABOUT_PROMO_COPY.copyDataTest}
            >
                {ABOUT_PROMO_COPY.copyLabel}
            </Button>
        </div>
        {reviewUrl ? (
            <div className={styles.action}>
                <Button
                    variant="accent"
                    href={reviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<IoChatboxEllipsesOutline />}
                    dataTest={ABOUT_PROMO_COPY.reviewDataTest}
                >
                    {ABOUT_PROMO_COPY.reviewLabel}
                </Button>
            </div>
        ) : null}
    </div>
);

export default AboutPromoActions;
