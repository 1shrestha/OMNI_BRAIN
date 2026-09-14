import "./globals.css";

export const metadata = {
  title: "OmniBrain - Document & Website Intelligence",
  description: "Point it at anything. Ask it everything.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}