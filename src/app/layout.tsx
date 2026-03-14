import type { Metadata } from "next";
import ReduxProvider from "@/store/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DebtWatch",
  description: "UK debt, borrowing and public finance explained.",
  icons: {
    icon: "/assets/debtwatch-logo.png",
    shortcut: "/assets/debtwatch-logo.png",
    apple: "/assets/debtwatch-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
