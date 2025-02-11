import BackgroundBlock from "@/components/details/background-block";
import LoginForm from "@/components/login/login-form";
import LogoutButton from "@/components/login/logout-button";
import { cookies } from "next/headers";

export default async function LoginPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get("landrupdans_token")?.value

    const isLoggedIn = !!token

    return (
        <article className="h-full overflow-hidden">
            <BackgroundBlock />
            <section className="flex flex-col gap-1 items-center justify-center py-20 z-50 relative h-full px-8">
                <h1 className="text-[48px]">{isLoggedIn ? "Log Ud" : "Log Ind"}</h1>
                {isLoggedIn ? <LogoutButton /> : <LoginForm />}
            </section>
        </article>
    )
}