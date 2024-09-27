import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "./ClientProviders";

import './styles/index.css';

const inter = Inter({ subsets: ["latin",  "cyrillic"], variable: '--font-inter' });

export const metadata: Metadata = {
    title: "My Quiz App",
    description: "Check your knowledge",
};

export default function RootLayout({
    children,
    locale
}: Readonly<{
    children: React.ReactNode;
    locale : string
}>) {
    return (
        <html lang={locale || "en"}>
            <body className={`${inter.variable} bg-white-bg text-textBlack dark:bg-black-text dark:text-white-bg`}>
                <ClientProviders>{children}</ClientProviders>
                
            </body>
        </html>
    );
}
