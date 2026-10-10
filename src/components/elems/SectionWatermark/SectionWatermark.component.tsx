import { FC } from 'react';
import styles from '@/components/elems/SectionWatermark/SectionWatermark.module.scss';
import { SectionWatermarkPropsIF } from '@/components/elems/SectionWatermark/SectionWatermark.types';

const SectionWatermark: FC<SectionWatermarkPropsIF> = ({
    text,
    className = '',
}) => (
    <div className={`${styles.watermark} ${className}`} aria-hidden="true">
        {text}
    </div>
);

export default SectionWatermark;
