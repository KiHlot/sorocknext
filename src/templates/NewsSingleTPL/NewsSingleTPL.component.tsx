import { FC } from 'react';
import PostContentSection from '@/components/sections/PostContentSection/PostContentSection.component';
import SinglePostPromoSection from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.component';
import styles from '@/templates/NewsSingleTPL/NewsSingleTPL.module.scss';
import { NewsSingleTPLPropsIF } from '@/templates/NewsSingleTPL/NewsSingleTPL.types';

const NewsSingleTPL: FC<NewsSingleTPLPropsIF> = ({ data }) => {
    return (
        <div className={`flcol ${styles.newsSingleTPLWrapper}`}>
            <SinglePostPromoSection data={data?.promoSection} />
            <PostContentSection content={data?.content} />
        </div>
    );
};

export default NewsSingleTPL;
