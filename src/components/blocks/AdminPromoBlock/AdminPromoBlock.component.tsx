import { FC } from 'react';
import dayjs from '~/dayjs';
import { RxUpdate } from '~/react-icons/rx';
import { TIME_FORMAT } from '@/helpers/config';
import styles from '@/components/blocks/AdminPromoBlock/AdminPromoBlock.module.scss';
import { AdminPromoBlockPropsIF } from '@/components/blocks/AdminPromoBlock/AdminPromoBlock.types';
import Block from '@/components/blocks/Block/Block.component';
import MainButton from '@/components/elems/MainButton/MainButton.component';

const AdminPromoBlock: FC<AdminPromoBlockPropsIF> = ({
    title,
    children = null,
    modifyData,
    isLoading,
    clickHandler,
}) => {
    return (
        <Block className={`flcol ${styles.blockWrapper}`}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <div className={`flcol ${styles.cronInfoWrapper}`}>
                <div
                    className={`${styles.cronInfoBlock} ${styles[modifyData?.lastUpdateStatus || 'error']}`}
                >
                    <div className={styles.label}>Последнее обновление:</div>
                    <div className={styles.value}>
                        {modifyData?.lastUpdate
                            ? dayjs(
                                  modifyData.lastUpdate,
                                  TIME_FORMAT.common,
                              ).format(TIME_FORMAT.previewWithTime)
                            : 'no date'}
                    </div>
                    <div className={`${styles.value} `}>
                        {modifyData?.lastUpdateStatus || 'error'}
                    </div>
                    <div className={styles.value}>
                        {modifyData?.updatedBy || 'error'}
                    </div>
                    <MainButton
                        variant="default"
                        className={styles.updateCronInfoButton}
                        disabled={isLoading}
                        clickHandler={clickHandler}
                    >
                        <RxUpdate />
                    </MainButton>
                </div>
            </div>
            {children}
        </Block>
    );
};

export default AdminPromoBlock;
