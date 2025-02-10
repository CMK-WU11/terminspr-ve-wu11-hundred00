"use client"

import Login from "@/actions/credentials/Login"
import { useActionState, useEffect } from "react"
import Button from "../common/button"

export default function LoginForm() {
    const [formState, formAction, isPending] = useActionState(Login, null)

    useEffect(function () {
        console.log("formState", formState)
    }, [formState])

    return (
        <form action={formAction} noValidate className="w-full">
            <div>
                <input defaultValue={formState?.formData?.username} type="text" name="username" className="border p-3 text-black" placeholder="brugernavn"/>
                <span className="text-red-700">{formState?.errors?.username?._errors[0]}</span>
            </div>
            <div>
                <input defaultValue={formState?.formData?.password} type="password" name="password" className="border p-3 text-black" placeholder="adgangskode"/>
                <span className="text-red-700">{formState?.errors?.password?._errors[0]}</span>
            </div>

            <span className="text-red-700">{formState?.error}</span>

            <button disabled={isPending} type="submit">
                {isPending ? <Button text={"Logger ind..."}/> : <Button text={"Log ind"}/>}
            </button>
        </form>
    )
}