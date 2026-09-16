import { ReactElement } from 'react';
import CommonLayout, {
    Content,
    Sidebar,
} from '@/layouts/CommonLayout/CommonLayout.component';

export default function NotFound(): ReactElement {
    return (
        <CommonLayout>
            <Content>
                <h1>404 - Страница не найдена</h1>
                <p>Извините, запрошенная страница не существует.</p>
            </Content>
            <Sidebar />
        </CommonLayout>
    );
}
