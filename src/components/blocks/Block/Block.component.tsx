import { FC } from 'react';
import styles from '@/components/blocks/Block/Block.module.scss';
import { BlockPropsIF } from '@/components/blocks/Block/Block.types';

const Block: FC<BlockPropsIF> = ({ children, className = '' }) => {
    return (
        <div className={`${styles.blockWrapper} ${className}`}>{children}</div>
    );
};

export default Block;
