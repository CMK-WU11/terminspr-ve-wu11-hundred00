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
      <div className="row-start-4">
        <Logo />
      </div>
      {showBtn &&
        <button className="mx-20 row-start-6">
          <Link href={"/aktiviteter"}><Button text={"Kom i gang"} appear={true} /></Link>
        </button>
      }
    </article>
  );
}
