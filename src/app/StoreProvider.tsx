'use client';

import { ReactElement, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { StoreProviderIF } from '@/app/types';

export default function StoreProvider({
    children,
}: StoreProviderIF): ReactElement {
    const [store] = useState(() => makeStore());

    return <Provider store={store}>{children}</Provider>;
}
