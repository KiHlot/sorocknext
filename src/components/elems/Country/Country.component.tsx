import { FC } from 'react';
import styles from '@/components/elems/Country/Country.module.scss';
import { CountryPropsIF } from '@/components/elems/Country/Country.types';
import { getFlagIcon } from '@/images/flags/_getFlagIcon';

const Country: FC<CountryPropsIF> = ({ value, className = '' }) => {
    return (
        <div className={`${styles.countryWrapper} ${className}`}>
            {getFlagIcon(value)}
        </div>
    );
};

export default Country;
