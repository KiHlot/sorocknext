import { FC } from 'react';
import styles from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.module.scss';
import { LastNewsPromoWidgetPropsIF } from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.types';

const LastNewsPromoWidget: FC<LastNewsPromoWidgetPropsIF> = ({ className }) => {
    const temporary = 'LastNewsPromoWidget';

    return (
        <div className={`${styles.lastNewsPromoWidgetWrapper} ${className}`}>
            {temporary}
        </div>
    );
};

export default LastNewsPromoWidget;
