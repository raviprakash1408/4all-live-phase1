'use client';

import '../styles/global.css';

import { Poppins } from 'next/font/google';

const metadata = {
  title: '4all.live',
  description: '4all.live',
};

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const isDarkMode = useTheme((state) => state.isDarkMode);
  // // const colorPallete = useTheme((state) => state.colorPallete);
  // document.documentElement.style.setProperty(
  //   '--primary-color',
  //   isDarkMode ? 'rgba(1, 25, 52, 1)' : '#1B3944'
  // );
  // document.documentElement.style.setProperty(
  //   '--tertiary-color',
  //   isDarkMode ? 'rgba(1, 34, 67, 1)' : '#21464F'
  // );
  // document.documentElement.style.setProperty(
  //   '--status-color',
  //   isDarkMode ? 'rgba(75, 109, 133, 1)' : '#1B3944'
  // );
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <title>{metadata.title}</title>
      </head>
      <link rel="icon" href="/assets/images/4All Logo.svg" />
      <body>{children}</body>
    </html>
  );
}
