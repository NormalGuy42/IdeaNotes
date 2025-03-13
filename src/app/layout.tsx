
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from  "./provider";
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { redirect, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaNotes",
  description: "A platform for your ideas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

 

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