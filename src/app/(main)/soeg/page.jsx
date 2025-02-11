import Header from "@/components/common/header";
import SearchResults from "@/components/search/search-results";
import { fetchServer } from "@/lib/api/fetch-server";

export const metadata = {
    title: "Søg",
    description: "Find alle aktiviteter",
};

export default async function Search() {
    const activities = await fetchServer("http://localhost:4000/api/v1/activities")

    return (
        <>
            <Header title={"Søg"} />
            <article className="px-6">
                <SearchResults activities={activities} />
            </article>
        </>
    );
}