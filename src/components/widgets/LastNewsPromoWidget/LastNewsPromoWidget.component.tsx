import { FC } from 'react';
import styles from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.module.scss';
import { LastNewsPromoWidgetPropsIF } from '@/components/widgets/LastNewsPromoWidget/LastNewsPromoWidget.types';

const LastNewsPromoWidget: FC<LastNewsPromoWidgetPropsIF> = ({ data }) => {
    const temp = 'LastNewsPromoWidget';

    return (
        <div className={styles.lastNewsPromoWidgetWrapper}>
            {temp}
        </div>
    );
};

export default LastNewsPromoWidget;
