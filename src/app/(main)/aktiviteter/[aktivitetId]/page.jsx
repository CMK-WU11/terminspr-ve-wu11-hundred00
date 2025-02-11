import JoinLeaveButton from "@/components/misc/activity-join-button"
import { fetchServer } from "@/lib/api/fetch-server"
import { cookies } from "next/headers"

export default async function ActivityPage({ params }) {
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

    const name = data?.name || "Ukendt aktivitet"
    const week = data?.weekday || "Mandag"
    const time = data?.time || "8:00"
    const description = data?.description || "Text"
    const imageUrl = data?.asset.url || "/images/placeholder.jpg"
    const minAge = data?.minAge || 10
    const maxAge = data?.maxAge || 20

    const isLoggedIn = !!token
    const isJoined = userData?.activities?.some(activity => activity.id === Number(id)) || false

    return (
        <article>
            <section className="relative">
                <img src={imageUrl} className="" />
                {isLoggedIn &&
                    <JoinLeaveButton
                        userId={uid}
                        activityId={id}
                        token={token}
                        isJoined={isJoined}
                    />
                }
            </section>
            <section className="py-3 px-6">
                <h2 className="text-[24px]">{name}</h2>
                <p className="text-sm">{week}: {time}</p>
                <p>{minAge}-{maxAge} år</p>
                <p className="pt-2">{description}</p>
            </section>
        </article>
    )
}