import { FC } from 'react';
import { getFlagIcon } from '@/images/flags/_getFlagIcon';
import styles from '@/components/elems/Country/Country.module.scss';
import { CountryPropsIF } from '@/components/elems/Country/Country.types';

const Country: FC<CountryPropsIF> = ({
    value,
    className = '',
    size = 'default',
}) =>
    value ? (
        <div
            className={`${styles.countryWrapper} ${styles[size]} ${className}`}
        >
            {getFlagIcon(value)}
        </div>
    ) : null;

export default Country;
