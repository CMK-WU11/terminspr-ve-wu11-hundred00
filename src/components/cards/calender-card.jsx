import Link from "next/link"

export default async function CalendarCard({ data, userId }) {
    const id = data?.id || "1"
    const name = data?.name || "Ukendt aktivitet"
    const week = data?.weekday || "Mandag"
    const time = data?.time || "8:00"

    return (
        <Link href={{ pathname: `/kalender/${id}`, query: { id: userId } }}>
            <article className="bg-mainWhite rounded-xl shadow-sm py-3 px-8 text-black overflow-hidden overflow-ellipsis pb-5 max-w-[22rem] whitespace-nowrap">
                <h2 className="text-[36px]">{name}</h2>
                <h3>{week} {time}</h3>
            </article>
        </Link>
    )
}