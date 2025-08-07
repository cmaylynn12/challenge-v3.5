import { AppWrapper } from "@/contexts/AppWrapper";
import "./globals.css";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppWrapper>
          <Suspense>{children}</Suspense>
        </AppWrapper>
      </body>
    </html>
  );
}
