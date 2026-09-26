import { FC } from 'react';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import Button from '@/components/controls/Button/Button.component';
import styles from '@/components/interactive/ReviewButton/ReviewButton.module.scss';
import { ReviewButtonPropsIF } from '@/components/interactive/ReviewButton/ReviewButton.types';

const ReviewButton: FC<ReviewButtonPropsIF> = ({
    href,
    className = '',
    dataTest,
    size = 'default',
}) => (
    <Button
        isCustom
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flc ${styles.reviewButton} ${styles[size]} ${className}`}
        aria-label="Оставить отзыв"
        dataTest={dataTest}
    >
        <IoChatboxEllipsesOutline aria-hidden="true" />
    </Button>
);

export default ReviewButton;
