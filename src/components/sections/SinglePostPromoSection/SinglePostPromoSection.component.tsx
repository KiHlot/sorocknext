import { FC } from 'react';
import {
    IoTimerOutline,
    IoCalendarOutline,
    IoPersonOutline,
} from 'react-icons/io5';
import { formatDate } from '@/helpers/utils';
import Author from '@/components/elems/Author/Author.component';
import Country from '@/components/elems/Country/Country.component';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';
import styles from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.module.scss';
import { SinglePostPromoSectionPropsIF } from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.types';

const SinglePostPromoSection: FC<SinglePostPromoSectionPropsIF> = ({
    postBase,
    pathname,
}) => {
    const { main, country, settings, innerImg, author } = postBase;

    return (
        <section className={`flcol ${styles.singlePostPromoSectionWrapper}`}>
            <div
                className={`bgc ${styles.bg}`}
                style={{
                    backgroundImage: `linear-gradient(
        		to left,
        		rgba(40, 48, 57, 0.6),
        		rgba(40, 48, 57, 1)), url(${innerImg}`,
                }}
            />
            <Breadcrumbs pathname={pathname} title={main.titleSeo} />
            <h1 className={styles.title}>{main.titleH1}</h1>
            <div className={styles.perks}>
                <ul>
                    <li title="Дата публикации">
                        <IoCalendarOutline />
                        {formatDate(main.postDate)}
                    </li>
                    <li title="Время на прочтение">
                        <IoTimerOutline />
                        {settings.readingTime}мин.
                    </li>
                    <li title="Автор">
                        <IoPersonOutline />
                        <Author data={author} type="name" />
                    </li>
                </ul>
                <Country value={country} />
            </div>
        </section>
    );
};

export default SinglePostPromoSection;
