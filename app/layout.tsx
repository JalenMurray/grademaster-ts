import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './app.css';
import '@aws-amplify/ui-react/styles.css';
import ConfigureAmplifyClientSide from './utils/ConfigureAmplify';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ConfigureAmplifyClientSide />
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
