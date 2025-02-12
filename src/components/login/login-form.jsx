"use client"

import Login from "@/actions/credentials/Login"
import { useActionState, useEffect, useState } from "react"
import Button from "../common/button"

export default function LoginForm() {
    const [formState, formAction, isPending] = useActionState(Login, null)
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(function () {
        console.log("formState", formState)
    }, [formState])

    return (
        <form action={formAction} noValidate className="flex flex-col gap-4 w-full">
            <section className="flex flex-col gap-4">
                <div>
                    <input defaultValue={formState?.formData?.username} type="text" name="username" className="border p-3 text-black w-full" placeholder="brugernavn" />
                    <span className="text-red-700">{formState?.errors?.username?._errors[0]}</span>
                </div>
                <div>
                    <input defaultValue={formState?.formData?.password} type="password" name="password" className="border p-3 text-black w-full" placeholder="adgangskode" />
                    <span className="text-red-700">{formState?.errors?.password?._errors[0]}</span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4" />
                    <span>Husk mig</span>
                </label>
            </section>

            <span className="text-red-700">{formState?.error}</span>

            <button disabled={isPending} type="submit" className="px-9">
                {isPending ? <Button text={"Logger ind..."} /> : <Button text={"Log ind"} />}
            </button>

            <input type="hidden" name="rememberMe" value={rememberMe} />
        </form>
    )
}