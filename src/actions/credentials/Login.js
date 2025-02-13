"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from "zod"

export default async function Login(prevState, formData) {
    //Fejlhandling logik og zod validering har jeg taget og modificeret fra repitationsøvelsen
    //https://github.com/CMK-WU11/repetition

    const username = formData.get("username")
    const password = formData.get("password")
    const rememberMe = formData.get("rememberMe") === "on"

    const schema = z.object({
        username: z.string().min(1, { message: "Du skal udfylde brugernavn feltet" }),
        password: z.string().min(1, { message: "Du skal udfylde adgangskode feltet" })
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

        if (!response.ok) {
            if ([400, 401].includes(response.status)) {
                return {
                    formData: { username, password },
                    error: "Forkert email eller adgangskode"
                }
            }

            return {
                formData: { username, password },
                error: "Noget gik galt, prøv igen senere"
            }
        }

        const data = await response.json()

        const cookieStore = await cookies()
        const cookieOptions = rememberMe ? { maxAge: 60 * 60 * 24 } : {}

        cookieStore.set("landrupdans_token", data.token, cookieOptions)
        cookieStore.set("landrupdans_uid", data.userId, cookieOptions)

    } catch (error) {
        throw new Error(error)
    }

    redirect("/kalender")
}