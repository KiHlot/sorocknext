import { FC } from 'react';
import { normalizeImage } from '@/helpers/utils';
import styles from '@/components/elems/Img/Img.module.scss';
import { ImgPropsIF } from '@/components/elems/Img/Img.types';

const Img: FC<ImgPropsIF> = ({ className = '', url, type = 'user80' }) => (
    <span
        className={`bgc ${styles.imgWrapper} ${className}`}
        style={{
            backgroundImage: `url(${normalizeImage(url, type)})`,
        }}
    />
);

export default Img;
