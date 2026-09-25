import { FC } from 'react';
import Section from '@/components/blocks/Section/Section.component';
import {
    hasPostContent,
    normalizePostContent,
} from '@/components/sections/PostContentSection/PostContentSection.helpers';
import styles from '@/components/sections/PostContentSection/PostContentSection.module.scss';
import { PostContentSectionPropsIF } from '@/components/sections/PostContentSection/PostContentSection.types';

const PostContentSection: FC<PostContentSectionPropsIF> = ({ content }) =>
    hasPostContent(content) ? (
        <Section
            className={styles.postContentSectionWrapper}
            ariaLabel="Текст статьи"
        >
            <div
                className="the_content"
                dangerouslySetInnerHTML={{
                    __html: normalizePostContent(content),
                }}
            />
        </Section>
    ) : null;

export default PostContentSection;
