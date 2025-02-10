export default function mainLayout({ children }) {
    return (
        <>
            <main style={{backgroundImage: "url(images/splash-image.jpg)"}} className="h-full bg-cover bg-center">
                {children}
            </main>
        </>
    )
}