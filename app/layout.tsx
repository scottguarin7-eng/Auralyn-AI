import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auralyn — Intelligence, beautifully in motion.",
  description:
    "Auralyn is a futuristic AI workspace for thinking, learning, researching, coding, and creating.",
  applicationName: "Auralyn",
  keywords: [
    "Auralyn",
    "AI workspace",
    "AI assistant",
    "Gemini",
    "productivity",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
