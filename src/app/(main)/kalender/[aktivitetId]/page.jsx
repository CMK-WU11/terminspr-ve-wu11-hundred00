import Header from "@/components/common/header"
import { fetchServer } from "@/lib/api/fetch-server"
import { cookies } from "next/headers"

export default async function CalenderActivityPage({ params }) {
    const id = (await params).aktivitetId

    const cookieStore = await cookies()
    const token = cookieStore.get("landrupdans_token")?.value
    const uid = cookieStore.get("landrupdans_uid")?.value

    const data = await fetchServer(`http://localhost:4000/api/v1/activities/${id}`)
    const response = await fetch(`http://localhost:4000/api/v1/users/${uid}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + token
        }
    })

    if (!response.ok) { throw new Error("failed to fetch user data") }
    const userData = await response.json()

    const role = userData?.role || "default"
    const name = data?.name || "Ukendt aktivitet"
    const week = data?.weekday || "mandag"
    const time = data?.time || "8:00"
    const users = Array.isArray(data?.users) ? data.users : []

    return (
        <>
            <Header title={name} />
            <article className="px-6">
                <p><strong>Ugedag:</strong> {week}</p>
                <p><strong>Tid:</strong> {time}</p>
                {role === "instructor" && (
                    <>
                        <br/><h3 className="text-lg font-semibold">Hold-Oversigt</h3>
                        <ul className="flex flex-col px-6">
                            {users.length > 0 ? (
                                users.map((user) => (<p key={user.id}>{user.firstname} {user.lastname}</p>))
                            ) : (
                                <p>Ingen har tilmeldt sig til denne aktivitet.</p>
                            )}
                        </ul>
                    </>
                )}
            </article>
        </>
    )
}