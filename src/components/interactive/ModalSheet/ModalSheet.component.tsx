'use client';

import { FC, useEffect, useId, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    popOverlay,
    pushOverlay,
} from '@/store/slices/siteConfig/siteConfig.slice';
import { useBreakpoint } from '@/hooks/breakpoint/breakpoint.hook';
import BottomSheet from '@/components/interactive/ModalSheet/BottomSheet/BottomSheet.component';
import Modal from '@/components/interactive/ModalSheet/Modal/Modal.component';
import { toggleOverflow } from '@/components/interactive/ModalSheet/ModalSheet.helpers';
import { ModalSheetPropsIF } from '@/components/interactive/ModalSheet/ModalSheet.types';

const ModalSheet: FC<ModalSheetPropsIF> = (props) => {
    const dispatch = useDispatch();
    const isMobile = useBreakpoint();
    const overlayId = useId();

    useEffect(() => {
        dispatch(pushOverlay(overlayId));

        return () => {
            dispatch(popOverlay(overlayId));
        };
    }, [overlayId]);

    useLayoutEffect(() => {
        toggleOverflow(true);

        return () => {
            toggleOverflow(false);
        };
    }, []);

    return isMobile && props.bottomSheetMobile ? (
        <BottomSheet props={props} overlayId={overlayId} />
    ) : (
        <Modal props={props} overlayId={overlayId} />
    );
};

export default ModalSheet;
