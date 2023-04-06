const moment = require("moment")

function shuffleWithTime(array) {
    let currentIndex = array.length, randomIndex;

    let dateTime = moment().add(array.length + 1, 'hours');
    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        dateTime = moment(dateTime).subtract(1, 'hours')
        const ts = moment(dateTime).format("YYYY-MM-DD hh:mm:ss"); //2022-11-17 08:02:53 sample date in mysql
        const dt = moment(dateTime).format("YYYY-MM-DD");//2022-11-17
        // console.log(x);      // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            { ...array[randomIndex], matchDt: ts }, { ...array[currentIndex], matchDt: ts },];
    }

    return array;
}



module.exports.createSchedule = (playersList) => {
    let x = []
    playersList.map((v, i) => {
        return x = [...x, ...playersList.slice(i + 1).map(v2 => {
            return { teamA: v, teamB: v2 }
        })]
    });
    let shuffledArray = shuffleWithTime([...x]);
    return shuffledArray
}