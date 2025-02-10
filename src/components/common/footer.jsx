import Link from "next/link";
import { LuHouse, LuSearch, LuCalendar } from "react-icons/lu";

export default function Footer() {
    return (
        <footer className="bg-white py-3 px-7 text-black fixed left-0 bottom-0 w-full">
            <ul className="flex items-center justify-between ">
                <li><Link href={"/aktiviteter"}>
                    <button className="p-2 rounded-full border border-1 border-solid border-black">
                        <LuHouse size={24} />
                    </button>
                </Link></li>
                <li><Link href={"/soeg"}>
                    <button className="p-2 rounded-full border border-1 border-solid border-black">
                        <LuSearch size={24} />
                    </button>
                </Link></li>
                <li><Link href={"/kalender"}>
                    <button className="p-2 rounded-full border border-1 border-solid border-black">
                        <LuCalendar size={24} />
                    </button>
                </Link></li>
            </ul>
        </footer>
    )
}