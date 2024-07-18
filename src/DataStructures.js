export const approaches = {
    asap: 'asap',
    laidBack: 'laidBack'
}

export const periods = {
    preFajr: 'preFajr',
    preDuhr: 'preDuhr',
    preAsr: 'preAsr',
    preMaghrib: 'preMaghrib',
    preIsha: 'preIsha',
    postIsha: 'postIsha'
};

export const periodDurations = [
    {
        period: periods.preFajr,
        duration: 2 // duration in hours
    },
    {
        period: periods.preDuhr,
        duration: 4 // duration in hours
    },
    {
        period: periods.preAsr,
        duration: 3 // duration in hours
    },
    {
        period: periods.preMaghrib,
        duration: 2 // duration in hours
    },
    {
        period: periods.preIsha,
        duration: 1.5 // duration in hours
    },
    {
        period: periods.postIsha,
        duration: 5 // duration in hours
    }
];

export const monthlyAvailableTime = [
    {
        spaceId: 1,
        title: 'learning',
        totalAvailableTime: 100, // hours
    }
]

export const daysInTheMonth = [
    { "day": 1, "weekday": 1, "week": 1 },
    { "day": 2, "weekday": 2, "week": 1 },
    { "day": 3, "weekday": 3, "week": 1 },
    { "day": 4, "weekday": 4, "week": 1 },
    { "day": 5, "weekday": 5, "week": 1 },
    { "day": 6, "weekday": 6, "week": 1 },
    { "day": 7, "weekday": 7, "week": 1 },
    { "day": 8, "weekday": 1, "week": 2 },
    { "day": 9, "weekday": 2, "week": 2 },
    { "day": 10, "weekday": 3, "week": 2 },
    { "day": 11, "weekday": 4, "week": 2 },
    { "day": 12, "weekday": 5, "week": 2 },
    { "day": 13, "weekday": 6, "week": 2 },
    { "day": 14, "weekday": 7, "week": 2 },
    { "day": 15, "weekday": 1, "week": 3 },
    { "day": 16, "weekday": 2, "week": 3 },
    { "day": 17, "weekday": 3, "week": 3 },
    { "day": 18, "weekday": 4, "week": 3 },
    { "day": 19, "weekday": 5, "week": 3 },
    { "day": 20, "weekday": 6, "week": 3 },
    { "day": 21, "weekday": 7, "week": 3 },
    { "day": 22, "weekday": 1, "week": 4 },
    { "day": 23, "weekday": 2, "week": 4 },
    { "day": 24, "weekday": 3, "week": 4 },
    { "day": 25, "weekday": 4, "week": 4 },
    { "day": 26, "weekday": 5, "week": 4 },
    { "day": 27, "weekday": 6, "week": 4 },
    { "day": 28, "weekday": 7, "week": 4 }
]

export const assignedGoals = [
    {
        goalId: 1,
        title: 'goal one',
        spaceId: 1,
        preferredTimeWindow: periods.preDuhr,
        durationOfSingleAttempt: 2, // hours
        selectedApproach: approaches.asap,
        scheduledDays: [1, 2, 3]
    },
    {
        goalId: 2,
        title: 'goal two',
        spaceId: 1,
        preferredTimeWindow: periods.preDuhr,
        durationOfSingleAttempt: 3, // hours
        selectedApproach: approaches.asap,
        scheduledDays: [2]
    },
]