import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import PageTransition from "./components/framer-motion/PageTransition";
import ButtonIPChecker from "./components/framer-motion/ButtonIPChecker";

export default function Home() {
    return (
        <PageTransition>
            <main className="flex justify-center items-center h-dvh">
                <Card className="p-2 w-[350px]">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl mb-5">
                            Welcome to FoundYou
                            <div className="border-b-2 mt-3"></div>
                        </CardTitle>
                        <CardDescription className="text-center text-">
                            {" "}
                            FoundYou adalah situs yang memungkinkan Anda
                            memasukkan alamat IP dan mendapatkan informasi
                            tentang IP tersebut.
                        </CardDescription>
                        <CardContent>
                            <div className="flex justify-center mt-5">
                                <ButtonIPChecker />
                            </div>
                        </CardContent>
                    </CardHeader>
                </Card>
            </main>
        </PageTransition>
    );
}
