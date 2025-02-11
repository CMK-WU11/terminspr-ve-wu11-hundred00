"use client"

import { useEffect, useState } from "react"
import SearchField from "./search-field"
import ActivityCard from "../cards/activity-card"

export default function SearchResults({ activities }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredActivities, setFilteredActivities] = useState(activities)

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (searchTerm.trim() === "") {
                setFilteredActivities(activities)
            } else {
                setFilteredActivities(
                    activities.filter(activity =>
                        activity.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                )
            }
        }, 500)

        return () => clearTimeout(delayDebounce)
    }, [searchTerm, activities])

    return (
        <>
            <SearchField value={searchTerm} onChange={setSearchTerm} />

            <ul className="flex flex-col gap-8 justify-center items-center">
                {filteredActivities.length > 0 ? (
                    filteredActivities.map(activity => (
                        <ActivityCard key={activity.id} data={activity} />
                    ))
                ) : (
                    <h2>Der blev ikke fundet nogle aktiviteter. Prøv at søge efter noget andet.</h2>
                )}
            </ul>
        </>
    )
}