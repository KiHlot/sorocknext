import { FC } from 'react';
import { RxUpdate } from 'react-icons/rx';
import { formatDate } from '@/helpers/utils';
import styles from '@/components/blocks/AdminPromoBlock/AdminPromoBlock.module.scss';
import { AdminPromoBlockPropsIF } from '@/components/blocks/AdminPromoBlock/AdminPromoBlock.types';
import Block from '@/components/blocks/Block/Block.component';
import Button from '@/components/controls/Button/Button.component';

const AdminPromoBlock: FC<AdminPromoBlockPropsIF> = ({
    title,
    children = null,
    modifyData,
    isLoading,
    clickHandler,
}) => (
    <Block className={`flcol ${styles.blockWrapper}`}>
        <h1 className={styles.pageTitle}>{title}</h1>
        {modifyData && (
            <div className={`flcol ${styles.cronInfoWrapper}`}>
                <div
                    className={`${styles.cronInfoBlock} ${styles[modifyData?.lastUpdateStatus || 'error']}`}
                >
                    <div className={styles.label}>Последнее обновление:</div>
                    <div className={styles.value}>
                        {formatDate(modifyData?.lastUpdate, 'withTime')}
                    </div>
                    <div className={`${styles.value} `}>
                        {modifyData?.lastUpdateStatus || 'error'}
                    </div>
                    <div className={styles.value}>
                        {modifyData?.updatedBy || 'error'}
                    </div>
                    <Button
                        variant="sq"
                        className={styles.updateCronInfoButton}
                        disabled={isLoading}
                        clickHandler={clickHandler}
                    >
                        <RxUpdate />
                    </Button>
                </div>
            </div>
        )}
        {children}
    </Block>
);

export default AdminPromoBlock;
