import { FC } from 'react';
import Link from 'next/link';
import { SITE_CATEGORIES } from '@/configs/siteCategories/siteCategories.config';
import styles from '@/components/elems/CategoryLink/CategoryLink.module.scss';
import { CategoryLinkPropsIF } from '@/components/elems/CategoryLink/CategoryLink.types';

const CategoryLink: FC<CategoryLinkPropsIF> = ({
    className = '',
    categorySLug,
    linkType = 'simple',
    size = 'default',
}) => {
    const categoryData = SITE_CATEGORIES[categorySLug];

    if (!categoryData) {
        return null;
    }

    return (
        <Link
            href={categoryData.link.url}
            className={`flc ${styles.categoryLink} ${
                linkType === 'text' ? styles.text : styles[size]
            } ${className}`}
            title={`Категория: ${categoryData.link.label}`}
        >
            {linkType === 'text' ? categoryData.link.label : categoryData.icon}
        </Link>
    );
};

export default CategoryLink;
