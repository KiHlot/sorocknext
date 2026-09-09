import { FC } from 'react';
import { createPortal } from 'react-dom';
import styles from '@/components/elems/Overlay/Overlay.module.scss';
import { OverlayPropsIF } from '@/components/elems/Overlay/Overlay.types';

const Overlay: FC<OverlayPropsIF> = ({
    children,
    className = '',
    isolationMode,
}) => (
    <>
        {createPortal(
            <div
                className={`${styles.overlayWrapper} ${className} ${isolationMode ? styles.isolationMode : ''}`}
            >
                {children}
            </div>,
            document.body,
        )}
    </>
);

export default Overlay;
