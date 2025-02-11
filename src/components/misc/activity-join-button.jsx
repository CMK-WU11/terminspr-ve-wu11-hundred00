"use client"

import { useState, useTransition } from "react"
import Button from "@/components/common/button"

export default function JoinLeaveButton({ userId, activityId, token, isJoined }) {
    const [joined, setJoined] = useState(isJoined)
    const [isPending, startTransition] = useTransition()

    const handleClick = () => {
        startTransition(async () => {
            const url = `http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`
            const options = {
                method: joined ? "DELETE" : "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }

            try {
                const response = await fetch(url, options)
                if (!response.ok) throw new Error("failed to update activity status")

                setJoined(!joined)
            } catch (error) {
                console.error("error updating activity status: ", error)
            }
        })
    }

    return (
        <button onClick={handleClick} disabled={isPending} className="absolute z-10 bottom-0 right-0 mb-5 mr-5">
            <Button text={isPending ? "Vent..." : joined ? "Forlad" : "Tilmeld"} />
        </button>
    )
}