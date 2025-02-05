import PageTransition from "../components/framer-motion/PageTransition";

export default function IPCheckLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PageTransition>{children}</PageTransition>;
}
