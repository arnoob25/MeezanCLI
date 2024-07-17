import {
    approaches,
    assignedGoals,
    daysInTheMonth,
    periods
} from "./src/DataStructures.js";
import { selectNextTimeWindow } from "./src/HelperFunctions.js";
import { assignOccurrencesInAvailableSpots } from "./src/SchedulerFunctions.js";


// initialization
const totalNumberOfAvailableDays = daysInTheMonth.length
const availableTime = 10 // monthlyAvailableTime[0].totalAvailableTime

// user inputs
let newGoal = {
    goalId: assignedGoals.length + 1,
    title: 'new goal',
    spaceId: 1,
    selectedApproach: approaches.asap,
    preferredTimeWindow: periods.preDuhr,
    durationOfSingleAttempt: 3, // hours
}

// calculate  occurrences 
const expectedNumberOfOccurrences = Math.min(Math.round(availableTime / newGoal.durationOfSingleAttempt), totalNumberOfAvailableDays)
let unScheduledOccurrences = expectedNumberOfOccurrences

while (true) {
    unScheduledOccurrences = assignOccurrencesInAvailableSpots(expectedNumberOfOccurrences, newGoal)

    // assign the rest of the occurrences in the next time window
    if (unScheduledOccurrences > 0) {
        newGoal = {
            ...newGoal,
            goalId: newGoal.goalId + 1,
            preferredTimeWindow: selectNextTimeWindow(newGoal),
        }
        continue
    }

    break
}

console.log('should occur: ', expectedNumberOfOccurrences);
console.log(assignedGoals);