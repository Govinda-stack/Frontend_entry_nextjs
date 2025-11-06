export const metadata = {
  title: 'IWMYWIF',
  description: 'Portfolio site converted to Next.js',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
