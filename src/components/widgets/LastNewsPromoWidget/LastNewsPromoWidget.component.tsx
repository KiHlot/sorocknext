import { FC } from 'react';
import styles from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.module.scss';
import { LastNewsPromoWidgetPropsIF } from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.types';

const LastNewsPromoWidget: FC<LastNewsPromoWidgetPropsIF> = ({ className }) => {
    const temp = 'LastNewsPromoWidget';

    return (
        <div className={`${styles.lastNewsPromoWidgetWrapper} ${className}`}>
            {temp}
        </div>
    );
};

export default LastNewsPromoWidget;
