"use client"

import { useTransition } from "react"
import Button from "../common/button";
import Logout from "@/actions/credentials/Logout";

export default function LogoutButton() {
    const [isPending, startTransition] = useTransition()

    return (
        <button onClick={() => startTransition(() => Logout())} disabled={isPending} className="px-9">
            {isPending ? <Button text="Logger ud..." /> : <Button text="Log ud" />}
        </button>
    )
}