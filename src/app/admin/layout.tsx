import { ReactElement } from 'react';
import AdminLayout from '@/layouts/AdminLayout/AdminLayout.component';
import { LayoutIF } from '@/app/types';

export default function AdminRootLayout({ children }: LayoutIF): ReactElement {
    return <AdminLayout>{children}</AdminLayout>;
}
