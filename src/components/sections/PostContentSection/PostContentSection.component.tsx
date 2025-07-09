import { FC } from 'react';
import Loading from '@/components/elems/Loading/Loading.component';
import styles from '@/components/sections/PostContentSection/PostContentSection.module.scss';
import { PostContentSectionPropsIF } from '@/components/sections/PostContentSection/PostContentSection.types';

const PostContentSection: FC<PostContentSectionPropsIF> = ({ content }) => {
    return content ? (
        <section className={styles.postContentSectionWrapper}>
            <div
                className="the_content"
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </section>
    ) : (
        <Loading height={400} />
    );
};

export default PostContentSection;
