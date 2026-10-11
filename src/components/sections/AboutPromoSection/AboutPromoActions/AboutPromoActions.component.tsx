import { FC } from 'react';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/sections/AboutPromoSection/AboutPromoActions/AboutPromoActions.module.scss';
import { AboutPromoActionsPropsIF } from '@/components/sections/AboutPromoSection/AboutPromoActions/AboutPromoActions.types';
import { ABOUT_PROMO_COPY } from '@/components/sections/AboutPromoSection/AboutPromoSection.config';

const AboutPromoActions: FC<AboutPromoActionsPropsIF> = ({
    reviewUrl,
    className = '',
}) =>
    reviewUrl ? (
        <div className={`${styles.actions} ${className}`}>
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
        </div>
    ) : null;

export default AboutPromoActions;
