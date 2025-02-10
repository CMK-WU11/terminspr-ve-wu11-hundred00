import Button from "@/components/common/button"
import { fetchServer } from "@/lib/api/fetch-server"
import checkLogin from "@/lib/api/is-logged-in"

export default async function ActivityPage({ params }) {
    const id = (await params).aktivitetId

    const data = await fetchServer(`http://localhost:4000/api/v1/activities/${id}`)
    const isLoggedIn = await checkLogin()

    const name = data?.name || "Ukendt aktivitet"
    const week = data?.weekday || "Mandag"
    const time = data?.time || "8:00"
    const description = data?.description || "Text"
    const imageUrl = data?.asset.url || "/images/placeholder.jpg"
    const minAge = data?.minAge | 10
    const maxAge = data?.maxAge | 20

    return (
        <article>
            <section className="relative">
                <img src={imageUrl} className="" />
                {isLoggedIn &&
                    <button className="absolute z-10 bottom-0 right-0 mb-5 mr-5">
                        <Button text={"Tilmeld"} />
                    </button>
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