import { FC } from 'react';
import { toExcerpt } from '@/components/cards/EventCard/EventCard.helpers';
import styles from '@/components/cards/EventCard/EventCard.module.scss';
import { EventCardPropsIF } from '@/components/cards/EventCard/EventCard.types';
import Button from '@/components/controls/Button/Button.component';
import Country from '@/components/elems/Country/Country.component';
import CopyLinkButton from '@/components/interactive/CopyLinkButton/CopyLinkButton.component';

const EventCard: FC<EventCardPropsIF> = ({ data, className = '' }) => {
    if (!data?.length) {
        return null;
    }

    return (
        <>
            {data.map((event, index) => {
                const excerpt = toExcerpt(event.content);

                return (
                    <article
                        key={event.url}
                        className={`${styles.card} ${className}`}
                    >
                        <div className={styles.frame}>
                            {event.coverImg && (
                                <div
                                    className={`bgc ${styles.bg}`}
                                    style={{
                                        backgroundImage: `linear-gradient(to left, rgba(40, 48, 57, 0.6), rgba(40, 48, 57, 1)), url(${event.coverImg})`,
                                    }}
                                    aria-hidden="true"
                                />
                            )}
                            <div className={styles.content}>
                                <h2 className={styles.title}>
                                    {event.titleH1}
                                </h2>
                                <p className={styles.author}>
                                    {event.author.fullName}
                                </p>
                                {!!event.tags?.length && (
                                    <ul
                                        className={styles.tags}
                                        aria-label="Теги"
                                    >
                                        {event.tags.map((tag) => (
                                            <li
                                                key={tag}
                                                className={styles.tag}
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {excerpt && (
                                    <p className={styles.excerpt}>{excerpt}</p>
                                )}
                            </div>
                            <footer className={styles.footer}>
                                <div className={styles.actions}>
                                    <Country value={event.country} />
                                    <CopyLinkButton
                                        url={event.url}
                                        dataTest={`event_card_copy_${index}`}
                                    />
                                </div>
                                <Button
                                    href={event.url}
                                    variant="secondarySmall"
                                    className={styles.readButton}
                                    dataTest={`event_card_read_${index}`}
                                >
                                    Читать
                                </Button>
                            </footer>
                        </div>
                    </article>
                );
            })}
        </>
    );
};

export default EventCard;
