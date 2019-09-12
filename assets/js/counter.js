
var translate = [63, 6, 91, 79, 102, 109, 125, 7, 127, 111];
var deadline = '2019-11-28'; //fan nu vet jag inte vilken ordning de ska vara...

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function numAt(number, index) {
    if (number < 10) number = '0' + number;

    return parseInt((number + '').charAt(index))
}

setInterval(function () {
    $(".tile.days:nth-child(1)").sevenSeg({ value: translate[numAt(getTimeRemaining(deadline).days, 0)] });
    $(".tile.days:nth-child(2)").sevenSeg({ value: translate[numAt(getTimeRemaining(deadline).days, 1)] });

    $(".tile.hours:nth-child(1)").sevenSeg({ value: translate[numAt(getTimeRemaining(deadline).hours, 0)] });
    $(".tile.hours:nth-child(2)").sevenSeg({ value: translate[numAt(getTimeRemaining(deadline).hours, 1)] });

    $(".tile.mins:nth-child(1)").sevenSeg({ value: translate[numAt(getTimeRemaining(deadline).minutes, 0)] });
    $(".tile.mins:nth-child(2)").sevenSeg({ value: translate[numAt(getTimeRemaining(deadline).minutes, 1)] });

    $(".tile.secs:nth-child(1)").sevenSeg({ value: translate[numAt(getTimeRemaining(deadline).seconds, 0)] });
    $(".tile.secs:nth-child(2)").sevenSeg({ value: translate[numAt(getTimeRemaining(deadline).seconds, 1)] });
}, 500);
