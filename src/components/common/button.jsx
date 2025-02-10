export default function Button({ text, appear }) {
    const textToShow = text || "Lorem"

    return (
        <div className={`bg-mainBackground rounded-xl px-20 py-3 shadow-xl ${appear ? "animate-fade" : "animate-none"}`}>
            <p>{textToShow}</p>
        </div>
    )
}