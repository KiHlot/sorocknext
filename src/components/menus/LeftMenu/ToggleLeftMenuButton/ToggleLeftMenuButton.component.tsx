import { FC } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsLeftMenuOpened } from '@/store/slices/globalDataSlice';
import { RootState } from '@/store/store';
import styles from '@/components/menus/LeftMenu/ToggleLeftMenuButton/ToggleLeftMenuButton.module.scss';

const ToggleLeftMenuButton: FC = () => {
    const dispatch = useAppDispatch();

    const { isLeftMenuOpened } = useAppSelector(
        (state: RootState) => state.globalDataSlice,
    );
    
    return (
        <button
            onClick={() => dispatch(setIsLeftMenuOpened(!isLeftMenuOpened))}
            className={`flc ${styles.toggleLeftMenuButtonWrapper}`}
        >
            <IoChevronBackOutline
                className={isLeftMenuOpened ? styles.opened : ''}
            />
        </button>
    );
};

export default ToggleLeftMenuButton;
