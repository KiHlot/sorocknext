import { FC } from 'react';
import { IoClose } from 'react-icons/io5';
import styles from '@/components/interactive/InfoBlock/InfoBlock.module.scss';
import { InfoBlockPropsIF } from '@/components/interactive/InfoBlock/InfoBlock.types';

const InfoBlock: FC<InfoBlockPropsIF> = ({
    title,
    children,
    onClose,
    variant = 'info',
    className = '',
}) => (
    <div
        className={`flcol ${styles.infoBlockWrapper} ${styles[variant]} ${className}`}
    >
        {onClose && (
            <button
                type="button"
                onClick={onClose}
                className={`flc ${styles.button}`}
            >
                <IoClose />
            </button>
        )}
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.content}>{children}</div>
    </div>
);

export default InfoBlock;
