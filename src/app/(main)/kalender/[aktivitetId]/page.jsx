import Header from "@/components/common/header"
import { fetchServer } from "@/lib/api/fetch-server"

export default async function CalenderActivityPage({ params }) {
    const id = (await params).aktivitetId

    const data = await fetchServer(`http://localhost:4000/api/v1/activities/${id}`)
    const name = data?.name || "Ukendt aktivitet"
    const users = Array.isArray(data?.users) ? data.users : []

    return (
        <>
            <Header title={name}/>
            <article>
                <ul className="flex flex-col px-6">
                {users.length > 0 ? (
                        users.map((user) => (<p key={user.id}>{user.firstname} {user.lastname}</p>))
                    ) : (
                        <p>Ingen har tilmeldt sig til denne aktivitet.</p>
                    )}
                </ul>
            </article>
        </>
    )
}