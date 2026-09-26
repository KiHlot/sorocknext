import { FC } from 'react';
import styles from '@/components/sections/RockDatesSection/EventCard/EventCard.module.scss';
import { EventCardPropsIF } from '@/components/sections/RockDatesSection/EventCard/EventCard.types';

const EventCard: FC<EventCardPropsIF> = ({ title, text }) => (
    <article className={styles.card}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
    </article>
);

export default EventCard;
