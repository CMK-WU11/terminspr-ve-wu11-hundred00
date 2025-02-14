"use client"

import { useState, useTransition } from "react"
import Button from "@/components/common/button"
import { useRouter } from "next/navigation"

export default function JoinLeaveButton({ userId, activityId, token, isJoined, userAge, userActivities, activityWeekday, minAge, maxAge }) {
    const [joined, setJoined] = useState(isJoined)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const isJoiningNewActivity = !joined
    const ageRestricted = isJoiningNewActivity && userAge < minAge || userAge > maxAge
    const weekdayConflict = isJoiningNewActivity && userActivities.some(activity => activity.weekday === activityWeekday)

    const isDisabled = ageRestricted || weekdayConflict
    let disabledMessage = ""

    if (ageRestricted) {
        disabledMessage = `Du skal være mellem ${minAge}-${maxAge} år for at deltage.`
    } else if (weekdayConflict) {
        disabledMessage = `Du er allerede tilmeldt en aktivitet på ${activityWeekday}.`
    }


    const handleClick = () => {
        //handleClick funciton har jeg taget fra en test opgave jeg lavede til migselv hjemmefra
        if (isDisabled) return

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

                router.refresh()
            } catch (error) {
                console.error("error updating activity status: ", error)
            }
        })
    }

    return (
        <button onClick={handleClick} disabled={isPending || isDisabled && isJoiningNewActivity} className="absolute z-10 bottom-0 right-0 mb-5 mr-5">
            <Button text={isPending ? "Vent..." : joined ? "Forlad" : "Tilmeld"} disabled={isDisabled && isJoiningNewActivity ? disabledMessage : null} />
        </button>
    )
}