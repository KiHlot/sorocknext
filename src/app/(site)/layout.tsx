import { ReactElement } from 'react';
import CommonLayout from '@/layouts/CommonLayout/CommonLayout.component';
import { LayoutIF } from '@/app/types';

export default function SiteLayout({ children }: LayoutIF): ReactElement {
    return <CommonLayout>{children}</CommonLayout>;
}
