"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { LuHouse, LuSearch, LuCalendar } from "react-icons/lu";

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (window.innerHeight - e.clientY < 80) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <footer className={`bg-white py-3 px-7 text-black fixed left-0 bottom-0 w-full transition-transform ${isVisible ? "animate-slideUp" : "animate-slideDown"}`}>
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