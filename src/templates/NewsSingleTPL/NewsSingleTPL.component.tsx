import { FC } from 'react';
import SinglePostPromoSection from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.component';
import styles from '@/templates/NewsSingleTPL/NewsSingleTPL.module.scss';
import { NewsSingleTPLPropsIF } from '@/templates/NewsSingleTPL/NewsSingleTPL.types';

const NewsSingleTPL: FC<NewsSingleTPLPropsIF> = ({ data }) => {
    return (
        <div className={styles.newsSingleTPLWrapper}>
            <SinglePostPromoSection data={data?.promoSection} />
        </div>
    );
};

export default NewsSingleTPL;
