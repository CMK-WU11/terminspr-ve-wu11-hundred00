"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

export default async function Signup(prevState, formData) {
    //Fejlhandling logik og zod validering har jeg taget og modificeret fra repitationsøvelsen
    //https://github.com/CMK-WU11/repetition

    const username = formData.get("username")
    const password = formData.get("password")
    const firstname = formData.get("firstname")
    const lastname = formData.get("lastname")
    const age = formData.get("age")

    const schema = z.object({
        username: z.string().min(1, { message: "Du skal udfylde brugernavn feltet" }),
        password: z.string().min(4, { message: "Adgangskode skal være mindst 4 tegn lang" }),
        firstname: z.string().min(1, { message: "Du skal udfylde fornavn feltet" }),
        lastname: z.string().min(1, { message: "Du skal udfylde efternavn feltet" }),
        age: z.preprocess(
            (val) => Number(val),
            z.number().min(10, { message: "Du skal være mindst 10 år gammel" })
        )
    })

    const validate = schema.safeParse({
        username,
        password,
        firstname,
        lastname,
        age
    })

    if (!validate.success) {
        return {
            formData: { username, password, firstname, lastname, age },
            errors: validate.error.format()
        }
    }

    try {
        const response = await fetch("http://localhost:4000/api/v1/users", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                username,
                password,
                firstname,
                lastname,
                age,
                role: "default"
            })
        })

        if (!response.ok) {
            if (response.status === 400) {
                return {
                    formData: { username, password, firstname, lastname, age },
                    error: "Brugernavn er allrede taget"
                }
            }

            return {
                formData: { username, password, firstname, lastname, age },
                error: "Noget gik galt, prøv igen senere"
            }
        }
    } catch (error) {
        console.error("Signup error: ", error)
        return {
            formData: { username, password, firstname, lastname, age },
            error: "Noget gik galt, prøv igen senere"
        }
    }

    redirect("/login")
}