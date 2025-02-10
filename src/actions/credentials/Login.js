"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export default async function Login(prevState, formData) {
    const username = formData.get("username")
    const password = formData.get("password")

    const schema = z.object({
        username: z.string().min(1, { message: "Du skal udfylde brugernavn feltet"}),
        password: z.string().min(1, { message: "Du skal udfylde adgangskode feltet"})
    })

    const validate = schema.safeParse({
        username,
        password
    })

    if (!validate.success) {
        return {
            formData: {
                username,
                password
            },
            errors: validate.error.format()
        }
    }

    try {
        const response = await fetch("http://localhost:4000/auth/token", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        if (response.status === 400) {
            return {
                formData: {
                    username,
                    password
                },
                error: "Forkert email eller adgangskode"
            }
        }

        const data = await response.json()
        
        const cookieStore = await cookies()
        cookieStore.set("landrupdans_token", data.token, { maxAge: 60 * 60 * 24 })
        cookieStore.set("landrupdans_uid", data.userId, { maxAge: 60 * 60 * 24 })

    } catch (error) {
        throw new Error(error)
    }

    redirect("/aktiviteter")
}