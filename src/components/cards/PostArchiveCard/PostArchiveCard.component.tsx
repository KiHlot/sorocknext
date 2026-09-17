import { FC } from 'react';
import styles from '@/components/cards/PostArchiveCard/PostArchiveCard.module.scss';
import { PostArchiveCardPropsIF } from '@/components/cards/PostArchiveCard/PostArchiveCard.types';

const PostArchiveCard: FC<PostArchiveCardPropsIF> = ({
    className = '',
    postData,
}) => {
    const temp = 'PostArchiveCard';

    return (
        <div className={`${styles.postArchiveCardWrapper} ${className}`}>
            {postData.titleH1}
        </div>
    );
};

export default PostArchiveCard;
