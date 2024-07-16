import { assignedGoals, periodDurations } from "./DataStructures.js";


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