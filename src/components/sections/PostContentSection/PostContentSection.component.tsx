import { FC } from 'react';
import Section from '@/components/blocks/Section/Section.component';
import Loading from '@/components/elems/Loading/Loading.component';
import styles from '@/components/sections/PostContentSection/PostContentSection.module.scss';
import { PostContentSectionPropsIF } from '@/components/sections/PostContentSection/PostContentSection.types';

const PostContentSection: FC<PostContentSectionPropsIF> = ({ content }) =>
    content ? (
        <Section className={styles.postContentSectionWrapper}>
            <div
                className="the_content"
                dangerouslySetInnerHTML={{
                    __html: content,
                }}
            />
        </Section>
    ) : (
        <Loading height={400} />
    );

export default PostContentSection;
