const fineCalculater = (dueDate) => {
    const finePerDay = 30;
    const today = new Date();
    const timeDiff = today - new Date(dueDate);

    if (timeDiff > 0) {
        const lateDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 
        const fine = finePerDay * lateDays;
        return fine;
    }

    return 0;
};

module.exports = { fineCalculater };
