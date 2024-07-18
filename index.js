import {
    approaches,
    assignedGoals,
    daysInTheMonth,
    periods
} from "./src/DataStructures.js";
import { selectNextUnattemptedTimeWindow } from "./src/HelperFunctions.js";
import { assignOccurrencesInAvailableSpots } from "./src/SchedulerFunctions.js";

// user inputs
const numberOfTimeWindows = periods.length;

let newGoal = {
    goalId: assignedGoals.length + 1,
    title: 'new goal',
    spaceId: 1,
    allowMultipleSameDayOccurrence: false,
    selectedApproach: approaches.asap,
    preferredTimeWindow: periods.preDuhr,
    durationOfSingleAttempt: 1, // hours
}

// calculate  occurrences 
let expectedNumberOfOccurrences = 10 // Math.min(Math.round(availableTime / newGoal.durationOfSingleAttempt), totalNumberOfAvailableDays)
console.log('should occur: ', expectedNumberOfOccurrences);

// track scheduling attempts
let schedulingAttempt = 1
let scheduledDays = []
let checkedTimeWindows = new Set(); // time windows that were checked for availability

while (true) {
    // schedule occurrences
    let { unScheduledOccurrences, assignedDays } = assignOccurrencesInAvailableSpots(
        expectedNumberOfOccurrences, newGoal, scheduledDays);
    scheduledDays = assignedDays

    console.log("attempt", schedulingAttempt, ': unscheduled occurrences: ', unScheduledOccurrences);

    let hasSchedulingCompleted = unScheduledOccurrences === 0 || checkedTimeWindows.size >= numberOfTimeWindows
    if (hasSchedulingCompleted) break;

    // handle scheduling conflicts
    let nextTimeWindow = selectNextUnattemptedTimeWindow(newGoal, checkedTimeWindows)
    if (nextTimeWindow === null) break

    // updated goal allows scheduling occurrences in other available time windows
    expectedNumberOfOccurrences = unScheduledOccurrences
    checkedTimeWindows.add(nextTimeWindow);
    newGoal = {
        ...newGoal,
        goalId: newGoal.goalId + 1,
        preferredTimeWindow: nextTimeWindow,
    };

    schedulingAttempt++
}

console.log(assignedGoals);