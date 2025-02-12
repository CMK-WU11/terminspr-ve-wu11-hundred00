export default function Button({ text, appear, disabled }) {
    const textToShow = text || "Lorem"

    return (
        <>
            <div className={`rounded-xl px-20 py-3 shadow-xl ${appear ? "animate-fade" : "animate-none"} ${disabled ? "cursor-not-allowed bg-[#45213d]" : "bg-mainBackground"}`}>
                <p>{textToShow}</p>
            </div>
            {disabled && <p className="text-red-500 text-sm mt-1 font-bold">{disabled}</p>}
        </>
    )
}