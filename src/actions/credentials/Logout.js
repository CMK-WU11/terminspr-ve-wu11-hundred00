"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Logout() {
    const cookieStore = await cookies()
    cookieStore.delete("landrupdans_token")
    cookieStore.delete("landrupdans_uid")

    redirect("/login")
}