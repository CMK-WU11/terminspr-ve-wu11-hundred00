"use client"

import { useEffect, useState } from "react";

import Button from "@/components/common/button";
import Logo from "@/components/misc/logo";
import Link from "next/link";

export default function Home() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowBtn(!showBtn);
    }, 1500)
  }, [])

  return (
    <article className="grid grid-rows-6 h-full">
      <Logo />
      {showBtn &&
        <button className="mx-20">
          <Link href={"/login"}><Button text={"Kom i gang"} appear={true} /></Link>
        </button>
      }
    </article>
  );
}
