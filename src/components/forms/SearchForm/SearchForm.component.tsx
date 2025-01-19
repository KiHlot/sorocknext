'use client';

import { FC } from 'react';
import { siteApi } from '@/api/site/site';
import styles from '@/components/forms/SearchForm/SearchForm.module.scss';
import { SearchFormPropsIF } from '@/components/forms/SearchForm/SearchForm.types';

const SearchForm: FC<SearchFormPropsIF> = ({ className }) => {
    const [search, { isLoading, isSuccess }] = siteApi.useSearchMutation();
    
    return (
        <div className={`${styles.wrapper} ${className || ''}`}>SearchForm</div>
    );
};

export default SearchForm;
