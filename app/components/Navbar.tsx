import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="flex flex-row justify-between p-5 border rounded-xl shadow-xl fixed w-full">
            <div className="flex flex-row gap-2">
                <Link href={"/"}>
                    <h1 className="font-bold text-xl">FoundYou</h1>
                </Link>
                <div className="flex items-end border-l-2">
                    <p className="ml-1 text-xs">by Lyraeth</p>
                </div>
            </div>
            <div className="flex flex-row gap-1 lg:text-xl">
                <Link href={"/support"}>
                    <p className="hover:text-slate-600 dark:hover:text-slate-400">
                        Support
                    </p>
                </Link>
            </div>
        </nav>
    );
}
