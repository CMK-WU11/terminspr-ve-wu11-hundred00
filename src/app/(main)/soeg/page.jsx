import ActivityCard from "@/components/cards/activity-card";
import SearchField from "@/components/misc/search-field";
import { fetchServer } from "@/lib/api/fetch-server";

export const metadata = {
    title: "Søg",
    description: "Find alle aktiviteter",
};

export default async function Search() {
    const data = await fetchServer("http://localhost:4000/api/v1/activities")

    return (
        <article className="px-6">
            <SearchField />

            <ul className="flex flex-col gap-8 justify-center items-center">
                {data.map((activity) => <ActivityCard key={activity.id} data={activity} />)}
            </ul>

            <h2 className="hidden">Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.</h2>
        </article>
    );
}