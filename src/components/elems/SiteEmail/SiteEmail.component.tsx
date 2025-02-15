import { FC } from 'react';
import { siteApi } from '@/api/site/site';
import styles from '@/components/elems/SiteEmail/SiteEmail.module.scss';
import { SiteEmailPropsIF } from '@/components/elems/SiteEmail/SiteEmail.types';

const SiteEmail: FC<SiteEmailPropsIF> = ({ className = '' }) => {
    const [, { data: baseData }] = siteApi.useGetBaseDataMutation({
        fixedCacheKey: 'baseData',
    });

    const { supportEmail } = baseData?.base || {};

    return supportEmail ? (
        <a
            href={`mailto:${supportEmail}`}
            className={`flc ${styles.siteEmailWrapper} ${className}`}
        >
            {supportEmail}
        </a>
    ) : null;
};

export default SiteEmail;
