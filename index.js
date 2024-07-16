import { approaches, assignedGoals, daysInTheMonth, monthlyAvailableTime, periods } from "./src/DataStructures.js";
import { assignOccurrencesInAvailableSpots } from "./src/SchedulerFunctions.js";

// initialization
const totalNumberOfAvailableDays = daysInTheMonth.length
const availableTime = 10 // monthlyAvailableTime[0].totalAvailableTime

// user inputs
const newGoal = {
    goalId: assignedGoals.length + 1,
    title: 'new goal',
    spaceId: 1,
    selectedApproach: approaches.laidBack,
    preferredTimeWindow: periods.preDuhr,
    durationOfSingleAttempt: 3, // hours
}

// calculate  occurrences 
const expectedNumberOfOccurrences = Math.min(Math.round(availableTime / newGoal.durationOfSingleAttempt), totalNumberOfAvailableDays)
let unScheduledOccurrences = expectedNumberOfOccurrences

/* while (unScheduledOccurrences > 0) {
    
} */

unScheduledOccurrences = assignOccurrencesInAvailableSpots(expectedNumberOfOccurrences, newGoal)

console.log(unScheduledOccurrences);
console.log(assignedGoals);