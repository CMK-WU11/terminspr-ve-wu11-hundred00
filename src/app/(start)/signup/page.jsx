import BackgroundBlock from "@/components/details/background-block";
import SignupForm from "@/components/login/signup-form";

export default async function SignupPage() {
    return (
        <article className="h-full overflow-hidden">
            <BackgroundBlock />
            <section className="flex flex-col gap-1 items-center justify-center py-20 z-50 relative h-full px-8">
                <h1 className="text-[48px]">Opret en konto</h1>
                <SignupForm />
            </section>
        </article>
    )
}