import CalendarCard from "@/components/cards/calender-card";
import { cookies } from "next/headers";

export const metadata = {
    title: "Kalender",
    description: "Find alle dine telmelde aktiviteter",
};

export default async function Calendar() {
    const cookieStore = await cookies()
    const token = cookieStore.get("landrupdans_token")
    const uid = cookieStore.get("landrupdans_uid")

    try {
        const response = await fetch(`http://localhost:4000/api/v1/users/${uid.value}`, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token.value
            }
        })

        if (response.status === 400) {
            return {
                formData: {
                    username,
                    password
                },
                error: "Forkert email eller adgangskode"
            }
        }

        const data = await response.json()
        const activities = data?.activities

        console.log(activities)

        return (
            <ul className="flex flex-col gap-8 justify-center items-center">
                {activities.map((activity) => <CalendarCard key={activity.id} data={activity} userId={uid.value}/>)}
            </ul>
        );
    } catch (error) {
        throw new Error(error)
    }
}
