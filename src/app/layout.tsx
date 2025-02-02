import { connectToMongoDB } from "@/db/connection";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IdeaNotes",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  connectToMongoDB()

  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/favicons/favicon-32x32.png" sizes="any" /> */}
      </head>
      <body className={inter.className}>
          {children}
      </body>
    </html>
  );
}