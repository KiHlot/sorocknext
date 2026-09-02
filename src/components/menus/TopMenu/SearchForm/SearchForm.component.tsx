'use client';

import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import { Input } from '@/components/controls/Input/Input.component';
import MainButton from '@/components/controls/MainButton/MainButton.component';
import { schema } from '@/components/menus/TopMenu/SearchForm/SearchForm.config';
import styles from '@/components/menus/TopMenu/SearchForm/SearchForm.module.scss';
import {
    SearchFormIF,
    SearchFormPropsIF,
} from '@/components/menus/TopMenu/SearchForm/SearchForm.types';

const SearchForm: FC<SearchFormPropsIF> = ({ className = '' }) => {
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<SearchFormIF>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
    });

    const onSubmit = async (values: SearchFormIF): Promise<void> => {
        const phrase = values.phrase.trim();
        if (phrase) {
            router.push(`/search?phrase=${encodeURIComponent(phrase)}`);
        }
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
                className={`flc ${styles.button}`}
                type="submit"
                disabled={!isValid}
                isCustom
            >
                <IoSearch />
            </MainButton>
        </form>
    );
};

export default SearchForm;
