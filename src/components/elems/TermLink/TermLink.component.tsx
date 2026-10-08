import { FC } from 'react';
import Link from 'next/link';
import { getPostTypeTerm } from '@/configs/postTypeTerms/postTypeTerms.config';
import styles from '@/components/elems/TermLink/TermLink.module.scss';
import { TermLinkPropsIF } from '@/components/elems/TermLink/TermLink.types';

const TermLink: FC<TermLinkPropsIF> = ({
    className = '',
    postType,
    termSlug,
    linkType = 'simple',
    size = 'default',
}) => {
    const termData = getPostTypeTerm(postType, termSlug);

    if (!termData) {
        return null;
    }

    return (
        <Link
            href={termData.link.url}
            className={`flc ${styles.termLink} ${
                linkType === 'text' ? styles.text : styles[size]
            } ${className}`}
            title={termData.link.label}
            aria-label={termData.link.label}
        >
            {linkType === 'text' ? termData.link.label : termData.icon}
        </Link>
    );
};

export default TermLink;
