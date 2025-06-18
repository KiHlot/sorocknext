'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { parseResponse } from '@/store/functions';
import { siteApi } from '@/api/site/site';
import { SearchIF, SearchResultIF } from '@/api/site/types';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import styles from '@/components/menus/TopMenu/SearchForm/SearchForm.module.scss';
import {
    FieldsNames,
    SearchFormPropsIF,
} from '@/components/menus/TopMenu/SearchForm/SearchForm.types';

const SearchForm: FC<SearchFormPropsIF> = ({ className = '' }) => {
    const router = useRouter();

    const [search, { isLoading }] = siteApi.useSearchMutation();

    const { handleSubmit, control, reset, watch } = useForm<SearchIF>({
        mode: 'onSubmit',
        defaultValues: {
            phrase: '',
        },
    });

    const phraseValue = watch('phrase');

    const onSubmit = async (values: SearchIF): Promise<void> => {
        await search(values)
            .unwrap()
            .then(data => {
                parseResponse<FieldsNames, SearchResultIF[]>(data, () => {
                    reset();
                    router.push('/search');
                    //TODO error
                });
            });
    };

    return (
        <form
            className={`${styles.searchFormWrapper} ${className}`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                name="phrase"
                placeholder="Поищем..."
                control={control}
                className={styles.input}
                styleType="default"
            />

            <MainButton
                type="submit"
                disabled={
                    isLoading ||
                    phraseValue.length < 5 ||
                    phraseValue.length > 30
                }
                className={styles.button}
                variant="default"
            >
                <IoSearch />
            </MainButton>
        </form>
    );
};

export default SearchForm;
