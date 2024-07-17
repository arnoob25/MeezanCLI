import { assignedGoals, periodDurations, daysInTheMonth } from "./DataStructures.js";


export function checkIfAvailableSpotExists(day, period, requiredTime) {
    // duration allocated to a specific period
    const allocatedTime = periodDurations.find(item => item.period === period).duration

    // list of goals in a specific period of a given day
    const listOfGoals = assignedGoals.filter(
        goal => goal.scheduledDays.includes(day) && goal.preferredTimeWindow === period
    );

    const usedTime = listOfGoals.reduce((sum, goal) => sum + goal.durationOfSingleAttempt, 0);

    const availableTime = Math.max(allocatedTime - usedTime, 0)

    return availableTime >= requiredTime
}

export function assignOccurrence({ goalId, title, spaceId, selectedApproach, preferredTimeWindow, durationOfSingleAttempt }, day) {
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

export function calculateInterval(maxOccurrences) {
    return Math.floor(daysInTheMonth.length / maxOccurrences)
}

export function findNextAvailableSpot(currentDay, targetDay, goal) {
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

export function selectNextTimeWindow(goal) {
    const currentTimeWindow = periodDurations.find(period => period.period === goal.preferredTimeWindow)

    const nextTimeWindowOrder = Math.min(currentTimeWindow.order + 1, periodDurations.length)
    const nextTimeWindow = periodDurations.find(period => period.order === nextTimeWindowOrder)

    return nextTimeWindow.period
}