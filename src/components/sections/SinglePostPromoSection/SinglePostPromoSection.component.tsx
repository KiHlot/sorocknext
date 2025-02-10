import { FC } from 'react';
import Loading from '@/components/blocks/Loading/Loading.component';
import Author from '@/components/elems/Author/Author.component';
import NoData from '@/components/elems/NoData/NoData.component';
import styles from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.module.scss';
import { SinglePostPromoSectionPropsIF } from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.types';

const SinglePostPromoSection: FC<SinglePostPromoSectionPropsIF> = ({
    data,
}) => {
    return data ? (
        <div className={styles.singlePostPromoSectionWrapper}>
            <div className="breadcrumbs"></div>
            <Author data={data.author} />
            <h1 className="title">{data.title}</h1>
            <div className="perks">
                <div className="date">{}</div>
                <div className="readtime"></div>
                <div className="country"></div>
            </div>
        </div>
    ) : (
        <Loading />
    );
};

export default SinglePostPromoSection;
