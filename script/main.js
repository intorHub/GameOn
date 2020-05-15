//to do list:
// JSON
var highScorArray = [];
const STORAGE_KEY = "high-scores";
function initscore() {
    console.log(localStorage.getItem(STORAGE_KEY))
    var highScore = JSON.parse(localStorage.getItem(STORAGE_KEY));
    //var highScore;
    if ( !highScore ) {
        var highScorArray = [
            { name: '---', score: 0, date: new Date() },
            { name: '---', score: 0, date: new Date() },
            { name: '---', score: 0, date: new Date() },
            { name: '---', score: 0, date: new Date() },
            { name: '---', score: 0, date: new Date() }
        ];
        console.log(highScorArray);
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(highScorArray));
        console.log(localStorage.getItem(STORAGE_KEY));
        highScore = highScorArray;
    }
    return highScore;
}
// git check
function setScore(scores) {
    return localStorage.setItem(STORAGE_KEY,JSON.stringify(scores));
}
var highScoreInfo = initscore();

//high score update func
function tableUpdate(arr) {
    var lines = "";
    for (let i = 0; i < arr.length; i++) {
        lines += '<div title =' + (arr[i].date ? arr[i].date : '') + '>  <span class="rec">' + arr[i].score + '</span> <span class="playerName">' + arr[i].name + '</span> </div>';
    }
    document.getElementById("bestPlayers").innerHTML = lines;
}
//game over results and stuff

tableUpdate(highScoreInfo);
// vars
var lvl = 1;
var gameLvl = document.getElementById("gameLevel");

var clickCounter = 0; //counts the clicks
const CLICKS_TO_NEXT_LVL = 10;
// var p = 

var p = document.getElementById("pointsOnScreen");  //on screen poins div
var jumpTime = 300;  //spinners ms to escape location 
const JUMP_TIME_REDUCE = 50;
var numberOfMissedClicks = document.getElementById("numOfMissed");   //counts missed clicks
var missedClicks = -1; //-1 : the click here btn counts as 1.
var miss = -1;
var grade = 1; //amount of points. starting at 1 because of the first click.

var ponitsLeftForLvl = document.getElementById("pointsToNextLevel");
var clicksToGo = 10;

// timer
var seconds = document.getElementById('secs');
var secs = 60;
//var mins = document.getElementById('min')
//var mins = 0;


var startBtn = document.getElementById("startBtn"); //in a var for changing its display
var spinDiv = document.getElementById("spinner"); //in a var for changing it's display and style
rotationSpeed = 2000;  //spinner bigining rotation speed 
const ROTATION_INCREASE = 250; //amount of speed reduced from animation duration each lvl
const POINTS_MUTLYPLAIER = 10; // multyply score by lvl 


function startGame() {    //start btn

    secs = 60;
    seconds.innerHTML = secs;                              //set primary time
    startBtn.style.display = "none";        //hide the start button
    spinDiv.style.display = "block";           // unhide the spiner
    p.innerHTML = grade;                    //count points on screen
    timer();
};



//function countDown() {

function timer() {

    secs--;
    seconds.innerHTML = secs;
    if (secs > 0) {
        setTimeout(timer, 1000);
    }
    else {
        gameOver();
    }
};







function goodClick() {
    console.log('it works');
    grade = grade + lvl + (lvl * POINTS_MUTLYPLAIER);
    p.innerHTML = grade;
    clicksToGo--;
    ponitsLeftForLvl.innerHTML = clicksToGo;

    clickCounter++;
    if (clickCounter == CLICKS_TO_NEXT_LVL) {
        clickCounter = 0;
        lvl++;
        secs += 10;
        //        rotationSpeed-=ROTATION_INCREASE;
        //      spinDiv.style.animationDuration=rotationSpeed+"ms";
        gameLvl.innerHTML = lvl;
        clicksToGo = 10;
        ponitsLeftForLvl.innerHTML = clicksToGo;
        
    }

    if (lvl == 6) {
        gameOver();
    }
}



function badClick() {
    grade = grade - lvl;
    missedClicks++;
    miss++;
    numberOfMissedClicks.innerHTML = missedClicks;
    p.innerHTML = grade;
};

//this function makes the target block escape 
spinDiv.onmouseover = function () {
    var overTimer = setTimeout(function () {
        console.log("event");
        spinDiv.style.top = Math.floor(Math.random() * 580) + "px";  //goes to the edge without letting the target block go beond screen 
        spinDiv.style.left = Math.floor(Math.random() * 680) + "px";  //goes to the edge without letting the target block go beond screen
    }, jumpTime)

   // spinDiv.onmouseout = function () { clearTimeout(overTimer) };

};





function gameOver() {
    alert("GAME OVER");
    //prompt("Enter Player Name");
    var indexToChange = highScoreInfo.length; //not nececerly entering the arr



    for (i = 0; i < highScoreInfo.length; i++) {
        if (grade > highScoreInfo[i].score) {
            indexToChange = i; //being saved in case of entering the arr avoiding addind to arr automaticly
            break;
        }
    }
    if (indexToChange != highScoreInfo.length) {

        // var playerName = 

        var newChalanger = { name: prompt("enter player name"), score: grade, date: new Date() };
        highScoreInfo.splice(indexToChange, 0, newChalanger);
        highScoreInfo.splice(highScoreInfo.length - 1, 1);
        console.log(highScoreInfo);
        tableUpdate(highScoreInfo);
        setScore(highScoreInfo);
    }



    //player = New Pla


}




