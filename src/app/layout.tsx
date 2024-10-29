import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';

const font = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-noto-sans-jp' });

export const metadata = {
  title: 'Hanabi Game',
  description: 'You can play the collaborative card game Hanabi. This site is used for research activities.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main className="h-screen w-screen overflow-hidden bg-gray-100">{children}</main>
      </body>
    </html>
  );
}
