import './globals.css';

export const metadata = {
  title: 'OTP Mail Automate',
  description: 'Send automatic OTPs securely via Gmail',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
