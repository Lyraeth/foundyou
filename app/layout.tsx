import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { AppCard } from "@/components/app-card";

const jost = Jost({
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata: Metadata = {
    title: "Found You",
    description: "A tool for search something with IP",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${jost.className} top-0 bottom-0 left-0 right-0 w-screen max-w-full bg-[#f4f1f8]`}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
