import { approaches, daysInTheMonth } from "./DataStructures.js";
import {
    assignOccurrence,
    calculateInterval,
    checkIfAvailableSpotExists,
    findNextAvailableSpot
} from "./HelperFunctions.js";

function scheduleUsingTheAsapMethod(maxOccurrences, goal, alreadyAssignedDays) {
    const { preferredTimeWindow, durationOfSingleAttempt, allowMultipleSameDayOccurrence } = goal

    const totalDays = daysInTheMonth.length
    let assignedDays = []
    let numberOfScheduledOccurrences = 0

    for (let day = 0; day < totalDays; day++) {
        const hasScheduledAllOccurrences = assignedDays.length >= maxOccurrences
        if (hasScheduledAllOccurrences) break

        // prevent or allow multiple occurrences in the same day
        const isCurrentDayAlreadyAssigned = alreadyAssignedDays.includes(day)
        if (!allowMultipleSameDayOccurrence && isCurrentDayAlreadyAssigned) continue

        const isSpotAvailable = checkIfAvailableSpotExists(day, preferredTimeWindow, durationOfSingleAttempt)
        if (!isSpotAvailable) continue

        assignOccurrence(goal, day)
        assignedDays.push(day)
    }

    return assignedDays
}

function scheduleUsingTheLaidBackMethod(maxOccurrences, goal, alreadyAssignedDays) {
    const { allowMultipleSameDayOccurrence } = goal

    const totalDays = daysInTheMonth.length;
    let assignedDays = []
    let interval = calculateInterval(maxOccurrences);

    for (let day = 0; day < totalDays; day++) {
        let hasScheduledAllOccurrences = assignedDays.length >= maxOccurrences
        if (hasScheduledAllOccurrences) break;

        const nextTargetDay = Math.min(day + interval, totalDays - 1);
        // handle schedule conflict
        const nextAvailableDayBeforeTarget = findNextAvailableSpot(day, nextTargetDay, goal);

        // prevent or allow multiple occurrences in the same day
        const isCurrentDayAlreadyAssigned = alreadyAssignedDays.includes(day) || assignedDays.includes(day)
        const shouldAssignOccurrence = (
            !allowMultipleSameDayOccurrence
                ? !isCurrentDayAlreadyAssigned && nextAvailableDayBeforeTarget !== null
                : nextAvailableDayBeforeTarget !== null
        )

        if (shouldAssignOccurrence) {
            assignOccurrence(goal, nextAvailableDayBeforeTarget);
            assignedDays.push(day);
            /** Note: we don't want to adjust the original spacing (target days)  
             * because that might make the occurrence too clustered or spread out
             */
            day = nextTargetDay;
            continue;
        }
    }

    return assignedDays;
}

export function assignOccurrencesInAvailableSpots(expectedNumberOfOccurrences, goal, alreadyAssignedDays) {
    const { selectedApproach } = goal
    let assignedDays = []
    let unScheduledOccurrences = expectedNumberOfOccurrences

    switch (selectedApproach) {
        case approaches.asap:
            assignedDays = scheduleUsingTheAsapMethod(expectedNumberOfOccurrences, goal, alreadyAssignedDays)
            break;

        case approaches.laidBack:
            assignedDays = scheduleUsingTheLaidBackMethod(expectedNumberOfOccurrences, goal, alreadyAssignedDays)
            break;

        default:
            break;
    }

    return {
        assignedDays: [...alreadyAssignedDays, ...assignedDays],
        unScheduledOccurrences: unScheduledOccurrences - assignedDays.length,
    }
}