import { fetchServer } from "@/lib/api/fetch-server"

export default async function ActivityPage({ params }) {
    const id = (await params).aktivitetId
    const userId = (await params).id

    console.log(userId)

    const data = await fetchServer(`http://localhost:4000/api/v1/activities/${id}`)
    const users = data?.users

    return (
        <article>
            <ul className="flex flex-col px-6">
                {users.map((user) => <p key={user.id}>{user.firstname} {user.lastname}</p>)}
            </ul>
        </article>
    )
}