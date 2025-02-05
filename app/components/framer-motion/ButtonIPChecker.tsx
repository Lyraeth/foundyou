"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export default function ButtonIPChecker() {
    return (
        <motion.button
            whileHover={{
                scale: 1.2,
                transition: { duration: 1 },
            }}
            whileTap={{ scale: 0.9 }}
        >
            <>
                <Link href={"/ipcheck"}>
                    <Button variant={"outline"}>
                        IPChecker
                        <MoveUpRight />
                    </Button>
                </Link>
            </>
        </motion.button>
    );
}
