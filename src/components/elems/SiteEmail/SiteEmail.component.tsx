import { FC } from 'react';
import { siteApi } from '@/api/site/site';
import styles from '@/components/elems/SiteEmail/SiteEmail.module.scss';

const SiteEmail: FC = () => {
    const { data } = siteApi.useGetCommonDataQuery();

    const { supportEmail } = data?.base || {};

    if (!supportEmail) {
        return null;
    }

    return (
        <a
            href={`mailto:${supportEmail}`}
            className={`flc ${styles.siteEmailWrapper}`}
        >
            {supportEmail}
        </a>
    );
};

export default SiteEmail;
