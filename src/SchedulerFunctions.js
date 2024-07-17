import { approaches, daysInTheMonth } from "./DataStructures.js";
import {
    assignOccurrence,
    calculateInterval,
    checkIfAvailableSpotExists,
    findNextAvailableSpot
} from "./HelperFunctions.js";


function scheduleUsingTheAsapMethod(maxOccurrences, goal) {
    const { preferredTimeWindow, durationOfSingleAttempt } = goal

    const totalDays = daysInTheMonth.length
    let numberOfScheduledOccurrences = 0

    for (let day = 0; day < totalDays; day++) {
        let hasScheduledAllOccurrences = numberOfScheduledOccurrences >= maxOccurrences
        if (hasScheduledAllOccurrences) break

        const isSpotAvailable = checkIfAvailableSpotExists(day, preferredTimeWindow, durationOfSingleAttempt)
        if (!isSpotAvailable) continue

        assignOccurrence(goal, day)
        numberOfScheduledOccurrences++
    }

    return numberOfScheduledOccurrences
}

function scheduleUsingTheLaidBackMethod(maxOccurrences, goal) {
    const totalDays = daysInTheMonth.length;
    let numberOfScheduledOccurrences = 0;
    let interval = calculateInterval(maxOccurrences);

    for (let day = 0; day < totalDays; day += interval) {
        let hasScheduledAllOccurrences = numberOfScheduledOccurrences >= maxOccurrences
        if (hasScheduledAllOccurrences) break;

        const targetDay = Math.min(day + interval, totalDays - 1);
        const availableDay = findNextAvailableSpot(day, targetDay, goal);

        if (availableDay === null) continue

        assignOccurrence(goal, availableDay);
        numberOfScheduledOccurrences++;

        /* Even if we found an available day earlier or later within the current interval, 
        we still want the next check to happen at the next intended interval. 
        This prevents the schedule from potentially becoming too clustered or spread out 
        due to adjustments made within intervals. */
        day = targetDay - 1;
    }

    return numberOfScheduledOccurrences;
}

export function assignOccurrencesInAvailableSpots(expectedNumberOfOccurrences, goal) {
    const { selectedApproach } = goal

    let unScheduledOccurrences = expectedNumberOfOccurrences
    let numberOfScheduledOccurrences = 0

    switch (selectedApproach) {
        case approaches.asap:
            numberOfScheduledOccurrences = scheduleUsingTheAsapMethod(expectedNumberOfOccurrences, goal)
            break;

        case approaches.laidBack:
            numberOfScheduledOccurrences = scheduleUsingTheLaidBackMethod(expectedNumberOfOccurrences, goal)
            break;

        default:
            break;
    }


    return unScheduledOccurrences - numberOfScheduledOccurrences
}