"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from  "./provider";
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { redirect, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "IdeaNotes",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const liveStatus = process.env.LIVE_STATUS;
  const pathname = usePathname()

  if((liveStatus === 'false' && pathname !== '/waitlist') || pathname === '/'){
    redirect('/waitlist')
  }
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicons/favicon-32x32.png" sizes="any" />
      </head>
      <Provider>
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </Provider>
    </html>
  );
}