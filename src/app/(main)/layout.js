import Footer from "@/components/common/footer";

export default function mainLayout({ children }) {
    return (
        <>
            <main className="pb-20">
                {children}
            </main>
            <Footer />
        </>
    )
}