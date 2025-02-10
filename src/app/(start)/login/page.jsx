import BackgroundBlock from "@/components/details/background-block";
import LoginForm from "@/components/misc/login-form";

export default function LoginPage() {
    return (
        <article className="h-full">
            <BackgroundBlock/>
            <section className="flex flex-col gap-5 items-center justify-center py-20 z-50 relative h-full">
                <h1 className="text-[48px] self-start">Log ind</h1>
                <LoginForm/>
            </section>
        </article>
    )
}