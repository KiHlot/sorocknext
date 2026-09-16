import { ReactElement } from 'react';
import { Inter } from 'next/font/google';
import { Bounce, ToastContainer } from 'react-toastify';
import '@/styles/global.scss';
import StoreProvider from '@/app/StoreProvider';
import { LayoutIF } from '@/app/types';

const inter = Inter({
    subsets: ['cyrillic'],
    variable: '--defaultFont',
});

export default function RootLayout({ children }: LayoutIF): ReactElement {
    return (
        <html lang="ru">
            <body
                className={`${inter.variable} ${inter.className} defaultTheme`}
            >
                <StoreProvider>
                    {children}
                    <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                        transition={Bounce}
                    />
                </StoreProvider>
            </body>
        </html>
    );
}
