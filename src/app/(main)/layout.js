import Footer from "@/components/common/footer";
import Header from "@/components/common/header";

export default function mainLayout({ children }) {
    return (
        <>
            <Header />
            <main className="pb-20">
                {children}
            </main>
            <Footer />
        </>
    )
}