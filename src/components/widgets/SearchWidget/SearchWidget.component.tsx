'use client';

import { FC, useTransition } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoSearch } from 'react-icons/io5';
import Block from '@/components/blocks/Block/Block.component';
import CheckBoxGroup from '@/components/controls/CheckBoxGroup/CheckBoxGroup.component';
import { Input } from '@/components/controls/Input/Input.component';
import Button from '@/components/controls/Button/Button.component';
import { schema } from '@/components/widgets/SearchWidget/SearchWidget.config';
import styles from '@/components/widgets/SearchWidget/SearchWidget.module.scss';
import {
    SearchWidgetFormIF,
    SearchWidgetPropsIF,
} from '@/components/widgets/SearchWidget/SearchWidget.types';

const SearchWidget: FC<SearchWidgetPropsIF> = ({
    searchConfig,
    queryParams,
}) => {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

    const {
        handleSubmit,
        control,
        formState: { isValid },
    } = useForm<SearchWidgetFormIF>({
        resolver: yupResolver(schema),
        mode: 'onSubmit',
        defaultValues: {
            phrase: queryParams?.phrase || '',
            postTypes: queryParams?.postTypes?.split(',') || [],
            categories: queryParams?.categories?.split(',') || [],
        },
    });

    const { categories, postTypes } = searchConfig;

    const onSubmit = async (values: SearchWidgetFormIF): Promise<void> => {
        const phrase = values.phrase.trim();

        if (phrase) {
            const params = new URLSearchParams();
            params.append('phrase', phrase);

            if (values.postTypes?.length) {
                params.append('postTypes', values.postTypes.join(','));
            }

            if (values.categories?.length) {
                params.append('categories', values.categories.join(','));
            }

            startTransition(() => {
                router.push(`/search?${params.toString()}`);
            });
        }
    };

    return (
        <Block>
            <form
                className={`flcol gapBlock ${styles.searchWidgetWrapper}`}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    name="phrase"
                    control={control}
                    placeholder="Поиск"
                    isDisabled={isPending}
                    isRequired
                />
                {!!postTypes?.length && (
                    <div className={`flcol gapBlock ${styles.blockWrapper}`}>
                        <h3 className={styles.label}>Типы</h3>
                        <CheckBoxGroup
                            name="postTypes"
                            control={control}
                            options={postTypes}
                            isDisabled={isPending}
                        />
                    </div>
                )}
                {!!categories?.length && (
                    <div className={`flcol gapBlock ${styles.blockWrapper}`}>
                        <h3 className={styles.label}>Категории</h3>
                        <CheckBoxGroup
                            name="categories"
                            control={control}
                            options={categories}
                            isDisabled={isPending}
                        />
                    </div>
                )}
                <Button
                    type="submit"
                    disabled={!isValid || isPending}
                    icon={<IoSearch />}
                >
                    Искать
                </Button>
            </form>
        </Block>
    );
};

export default SearchWidget;
