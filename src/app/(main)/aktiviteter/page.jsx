import ActivityCard from "@/components/cards/activity-card";
import Header from "@/components/common/header";
import { fetchServer } from "@/lib/api/fetch-server";

export const metadata = {
    title: "Aktiviteter",
    description: "Find alle aktiviteter",
};

export default async function Activities() {
    const data = await fetchServer("http://localhost:4000/api/v1/activities")

    return (
        <>
            <Header title={"Aktiviteter"} />
            <ul className="flex flex-col gap-8 justify-center items-center">
                {data.map((activity) => <ActivityCard key={activity.id} data={activity} />)}
            </ul>
        </>
    );
}
