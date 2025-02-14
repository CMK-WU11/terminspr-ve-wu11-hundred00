import Link from "next/link"

export default function ActivityCard({ data }) {
    const id = data?.id || "1"
    const name = data?.name || "Ukendt aktivitet"
    const imageUrl = data?.asset.url || "/images/placeholder.jpg"
    const minAge = data?.minAge || 10
    const maxAge = data?.maxAge || 20

    return (
        <Link href={`/aktiviteter/${id}`}>
            <article className="relative h-[22rem] text-black">
                <img src={imageUrl} alt={`Billede af personer der er i gang med ${name}`} loading="lazy" className="rounded-tl-[2em] rounded-tr-[2em] rounded-bl-[2em] object-cover w-[22rem] h-[22rem]" />
                <section className="absolute bottom-0 bg-cardTitle w-[22rem] rounded-tr-[2em] rounded-bl-[2em] p-4 bg-opacity-80">
                    <h2>{name}</h2>
                    <p>{minAge}-{maxAge} år</p>
                </section>
            </article>
        </Link>
    )
}