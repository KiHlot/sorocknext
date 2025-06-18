import dayjs from 'dayjs';
import { FC } from 'react';
import { IoTimerOutline } from 'react-icons/io5';
import { IoCalendarOutline } from 'react-icons/io5';
import { IoPersonOutline } from 'react-icons/io5';
import { TIME_FORMAT } from '@/helpers/config';
import Loading from '@/components/elems/Loading/Loading.component';
import Author from '@/components/elems/Author/Author.component';
import Country from '@/components/elems/Country/Country.component';
import styles from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.module.scss';
import { SinglePostPromoSectionPropsIF } from '@/components/sections/SinglePostPromoSection/SinglePostPromoSection.types';
import Breadcrumbs from '@/components/interactive/Breadcrumbs/Breadcrumbs.component';

const SinglePostPromoSection: FC<SinglePostPromoSectionPropsIF> = ({
    data,
}) => {
    return data ? (
        <section className={`flcol ${styles.singlePostPromoSectionWrapper}`}>
            <div
                className={`bgc ${styles.bg}`}
                style={{
                    backgroundImage: `linear-gradient(
        		to left,
        		rgba(35, 42, 52, 0.6),
        		rgba(35, 42, 52, 1)), url(${data.innerImg}`,
                }}
            />
            <Breadcrumbs title={data.titleSeo} />
            <h1 className={styles.title}>{data.titleH1}</h1>
            <div className={styles.perks}>
                <ul>
                    <li title="Дата публикации">
                        <IoCalendarOutline />
                        {dayjs(data.postDate, TIME_FORMAT.common).format(
                            'DD.MM.YYYY',
                        )}
                        г.
                    </li>
                    <li title="Время на прочтение">
                        <IoTimerOutline />
                        {data.readingTime}мин.
                    </li>
                    <li title="Автор">
                        <IoPersonOutline />
                        <Author data={data.author} type="name" />
                    </li>
                </ul>
                <Country value={data.country} />
            </div>
        </section>
    ) : (
        <Loading />
    );
};

export default SinglePostPromoSection;
