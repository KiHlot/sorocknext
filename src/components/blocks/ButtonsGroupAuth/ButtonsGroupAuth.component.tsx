'use client';

import { FC } from 'react';
import { usePathname } from 'next/navigation';
import { AUTH_BUTTONS_GROUP_CONFIG } from '@/components/blocks/ButtonsGroupAuth/ButtonsGroupAuth.config';
import ButtonsGroup from '@/components/interactive/ButtonsGroup/ButtonsGroup.component';

const ButtonsGroupAuth: FC = () => {
    const pathname = usePathname();

    return (
        <ButtonsGroup
            config={AUTH_BUTTONS_GROUP_CONFIG}
            controls={{
                activeTab: pathname.split('/').find(Boolean) || '',
            }}
            fullWidth
        />
    );
};

export default ButtonsGroupAuth;
