import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '솔리드버거 | 압도적인 두께, 정통 수제버거',
  description: '최상급 원재료로 매일 신선하게 만드는 정통 수제버거 프랜차이즈. 가맹 문의 환영합니다.',
  keywords: ['수제버거', '프랜차이즈', '버거', '가맹점', '솔리드버거'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
