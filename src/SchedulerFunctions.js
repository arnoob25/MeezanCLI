import { approaches, assignedGoals, daysInTheMonth } from "./DataStructures.js";
import { checkIfAvailableSpotExists } from "./HelperFunctions.js";


function assignOccurrence({ goalId, title, spaceId, selectedApproach, preferredTimeWindow, durationOfSingleAttempt }, day) {
    const alreadyOccurringGoal = assignedGoals.find(g => g.goalId === goalId)

    if (alreadyOccurringGoal) {
        const goalIndex = assignedGoals.findIndex(g => g.goalId === alreadyOccurringGoal.goalId)
        assignedGoals[goalIndex] = {
            ...alreadyOccurringGoal,
            scheduledDays: [...alreadyOccurringGoal.scheduledDays, day]
        }
    }

    else {
        assignedGoals.push({
            goalId,
            title,
            spaceId,
            selectedApproach,
            preferredTimeWindow,
            durationOfSingleAttempt, // hours
            scheduledDays: [day],
        })
    }
}

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

function calculateInterval(maxOccurrences) {
    return Math.floor(daysInTheMonth.length / maxOccurrences)
}

function findNextAvailableSpot(currentDay, targetDay, goal) {
    const { preferredTimeWindow, durationOfSingleAttempt } = goal;

    let forward = currentDay;
    let backward = currentDay - 1;
    const isWithinSearchRange = forward <= targetDay || backward >= 0

    while (isWithinSearchRange) {
        if (forward <= targetDay) {
            if (checkIfAvailableSpotExists(forward, preferredTimeWindow, durationOfSingleAttempt)) {
                return forward;
            }
            forward++;
        }
        // 
        /* todo: we may want to use a backwards search in the future

        // Note: The backward search will continue until reaching the start (day 0). 
        // This could be improved by adding more efficient criteria to limit the backward search.
        if (backward >= 0) {
            if (checkIfAvailableSpotExists(backward, preferredTimeWindow, durationOfSingleAttempt)) {
                return backward;
            }
            backward--;
        } */
    }
    return null; // No available spot found
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