import type { Metadata } from "next";
import ReduxProvider from "@/store/provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://debtwatch.uk"),
  title: "DebtWatch",
  description: "UK debt, borrowing and public finance explained.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
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
