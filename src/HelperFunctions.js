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

    const isWithinSearchRange = currentDay < targetDay // todo: incorporate backward search

    while (isWithinSearchRange) {
        if (checkIfAvailableSpotExists(currentDay, preferredTimeWindow, durationOfSingleAttempt)) {
            return currentDay;
        }
        currentDay++;

        /* todo: we may want to use a backwards search in the future

        // Note: The backward search could continue until reaching the start (day 0). 
        // This could be improved by adding more efficient criteria to limit the backward search.
        */
    }
    return null; // No available spot found
}

// TODO: check backwards from originally preferred time window after checking the following ones - until we check all the time windows
function findNextTimeWindow({ preferredTimeWindow }) {
    const selectedTimeWindowIndex = periodDurations.findIndex(period => period.period === preferredTimeWindow)
    const nextTimeWindowIndex = Math.min(selectedTimeWindowIndex + 1, periodDurations.length - 1)

    const nextTimeWindow = periodDurations[nextTimeWindowIndex]
    return nextTimeWindow.period
}

export function selectNextUnattemptedTimeWindow(goal, checkedTimeWindows) {
    let nextTimeWindow = null;
    const shouldSelectAnotherTimeWindow = checkedTimeWindows.has(nextTimeWindow)

    do {
        nextTimeWindow = findNextTimeWindow(goal);
    } while (shouldSelectAnotherTimeWindow);

    return nextTimeWindow
}