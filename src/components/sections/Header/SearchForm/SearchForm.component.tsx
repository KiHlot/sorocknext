'use client';

import { FC, useTransition } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import Button from '@/components/controls/Button/Button.component';
import { Input } from '@/components/controls/Input/Input.component';
import { schema } from '@/components/sections/Header/SearchForm/SearchForm.config';
import styles from '@/components/sections/Header/SearchForm/SearchForm.module.scss';
import {
    SearchFormIF,
    SearchFormPropsIF,
} from '@/components/sections/Header/SearchForm/SearchForm.types';

const SearchForm: FC<SearchFormPropsIF> = ({ className = '' }) => {
    const pathname = usePathname();
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

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
            startTransition(() => {
                router.push(`/search?phrase=${encodeURIComponent(phrase)}`);
            });
        }
    };

    if (pathname === '/search') {
        return null;
    }

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
                isDisabled={isPending}
            />
            <Button
                className={`flc ${styles.button}`}
                type="submit"
                disabled={!isValid || isPending}
                isCustom
                dataTest="search_form_submit"
            >
                <IoSearch />
            </Button>
        </form>
    );
};

export default SearchForm;
