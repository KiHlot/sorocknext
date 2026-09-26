import { FC } from 'react';
import styles from '@/components/cards/EventCard/EventCard.module.scss';
import { EventCardPropsIF } from '@/components/cards/EventCard/EventCard.types';
import Button from '@/components/controls/Button/Button.component';
import Country from '@/components/elems/Country/Country.component';
import CopyLinkButton from '@/components/interactive/CopyLinkButton/CopyLinkButton.component';

const EventCard: FC<EventCardPropsIF> = ({
    title,
    text,
    authorName,
    tags,
    country,
    cover,
    url,
    className = '',
}) => (
    <article className={`${styles.card} ${className}`}>
        <div className={styles.frame}>
            {cover && (
                <div
                    className={`bgc ${styles.bg}`}
                    style={{
                        backgroundImage: `linear-gradient(to left, rgba(40, 48, 57, 0.6), rgba(40, 48, 57, 1)), url(${cover})`,
                    }}
                    aria-hidden="true"
                />
            )}
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.author}>{authorName}</p>
                {tags.length > 0 && (
                    <ul className={styles.tags} aria-label="Теги">
                        {tags.map((tag) => (
                            <li key={tag} className={styles.tag}>
                                {tag}
                            </li>
                        ))}
                    </ul>
                )}
                <p className={styles.excerpt}>{text}</p>
            </div>
            <footer className={styles.footer}>
                <div className={styles.actions}>
                    <Country value={country} />
                    <CopyLinkButton url={url} dataTest="event_card_copy" />
                </div>
                <Button
                    href={url}
                    variant="secondarySmall"
                    className={styles.readButton}
                    dataTest="event_card_read"
                >
                    Читать
                </Button>
            </footer>
        </div>
    </article>
);

export default EventCard;
