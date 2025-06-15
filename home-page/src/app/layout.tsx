import '../style/globals.css';
import RootLayoutStyle from '@/components/rootLayoutStyle';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ko">
            <body>
                <RootLayoutStyle>{children}</RootLayoutStyle>
            </body>
        </html>
    );
}

export const metadata = {
    title: 'Cock Cock Sport',
};
