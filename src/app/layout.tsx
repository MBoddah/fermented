import Navbar from '@/components/Navbar';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic'] });

export const metadata = {
    title: 'Fermented',
    description: 'Выпей самое лучшее',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='ru'>
            <body className='bg-slate-200'>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
