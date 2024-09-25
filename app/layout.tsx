import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "./ClientProviders";

import store from "@/redux/store";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
    title: "My Quiz App",
    description: "Check your knowledge",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} bg-white-bg text-textBlack dark:bg-black-text dark:text-white-bg`}>
                <ClientProviders>{children}</ClientProviders>
                
            </body>
        </html>
    );
}
