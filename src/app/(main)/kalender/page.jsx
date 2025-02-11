import CalendarCard from "@/components/cards/calender-card";
import Header from "@/components/common/header";
import { fetchServer } from "@/lib/api/fetch-server";
import { cookies } from "next/headers";

export async function generateMetadata() {
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

        if (!response.ok) {
            throw new Error("failed to fetch user data")
        }

        const data = await response.json()
        const role = data?.role || "default"

        return {
            title: role === "instructor" ?
                "Hold-Oversigt" : "Kalender",
            description: role === "instructor" ?
                "Se de hold du er instruktør for" : "Se dine tilmeldte aktiviteter",
        }
    } catch (error) {
        console.log("metadata error: ", error)
        return { title: "Kalender", description: "Find alle dine tilmeldte aktiviteter" };
    }
}

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

        if (!response.ok) {
            throw new Error("failed to fetch user data")
        }

        const userData = await response.json()
        const role = userData?.role || "default"
        let headerTitle = "Kalender"
        let activities = []

        if (role === "instructor") {
            const instructorActivities = await fetchServer("http://localhost:4000/api/v1/activities")

            headerTitle = "Hold-Oversigt"

            if (!instructorActivities) throw new Error("Activities fetch failed");

            activities = instructorActivities.filter(activity => activity.instructorId === Number(uid.value))
        } else {
            activities = userData?.activities || []
        }

        return (
            <>
                <Header title={headerTitle}/>
                <ul className="flex flex-col gap-8 justify-center items-center">
                    {activities.length > 0 ? (
                        activities.map((activity) => (
                            <CalendarCard key={activity.id} data={activity} userId={uid.value} />
                        ))
                    ) : (
                        <p>Ingen aktiviteter fundet.</p>
                    )}
                </ul>
            </>
        );
    } catch (error) {
        throw new Error(error)
    }
}
