import { FC } from 'react';
import { siteApi } from '@/api/site/site';
import styles from '@/components/elems/SiteEmail/SiteEmail.module.scss';

const SiteEmail: FC = () => {
    const [, { data: baseData }] = siteApi.useGetBaseDataMutation({
        fixedCacheKey: 'baseData',
    });

    const { supportEmail } = baseData?.base || {};

    return supportEmail ? (
        <a href={`mailto:${supportEmail}`} className={styles.siteEmailWrapper}>
            {supportEmail}
        </a>
    ) : null;
};

export default SiteEmail;
