const MAX_JOBS = 19;
const MAX_TANK = 4;
const MAX_HEAL = 8;
const MAX_DPS = 19;

const TANKS = "img/01_TANK/Job/";
const HEALERS = "img/02_HEALER/Job/";
const DPS = "img/03_DPS/Job/";

var TANK_TAKEN = false;
var HEALER_TAKEN = false;

var midnightGang = {
    "0": "Aerla Aesta",
    "1": "Cral Smock",
    "2": "Nixie Marigold",
    "3": "Saturo Azad"
}

var jobNames = {
    "0": "Paladin",
    "1": "Warrior",
    "2": "DarkKnight",
    "3": "Gunbreaker",

    "4": "WhiteMage",
    "5": "Scholar",
    "6": "Astrologian",
    "7": "Sage",
    
    "8": "Monk",
    "9": "Dragoon",
    "10": "Ninja",
    "11": "Samurai",
    "12": "Reaper",
    "13": "Bard",
    "14": "Machinist",
    "15": "Dancer",
    
    "16": "BlackMage",
    "17": "Summoner",
    "18": "RedMage"
}

var weekdayURL = { 
    "sunday": "",
    "monday": "https://www.youtube-nocookie.com/embed/oMQT7txBj0Y",
    "tuesday": "https://www.youtube-nocookie.com/embed/4TYdhafjS44",
    "wednesday": "https://www.youtube-nocookie.com/embed/B_qnI1WrlnU",
    "thursday": "https://www.youtube-nocookie.com/embed/fxV_0CLZhgM",
    "friday": "https://www.youtube-nocookie.com/embed/V_cnK8Cd6Ag",
    "saturday": "https://www.youtube.com/watch?v=0mdMCrzI7lY"
}

const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

function today(){
    const date = new Date();
    const theDay = weekday[date.getDay()];
    console.log(theDay);
    return theDay;
}

function toggleButton(){
    var el = document.getElementById(".destroyAll");
    el.classList.toggle('destroyAll');
}


function addPlayer(){

    var tableRef = document.getElementById('row_container');
    var row = tableRef.insertRow(-1);

    var img = `<img src=${TANKS}${jobNames[3]}.png>`

    // christ allmighty please change this into something else
    row.innerHTML = '<td><button onclick="jobSpin(this)" class="job"> <img src="img/questionmarkbg.gif"></button></td><td><input class="uk-input uk-form-blank" type="text"  placeholder="Add player name..."> </td><td><button onclick="removePlayer(this)" class="remove" ><img src="img/trash.gif"></button></td>';
}

function removePlayer(el){
        el.closest('tr').remove();
        console.log(`removed ${el}`)
}

function removeAllPlayers(){
    var tableRef = document.getElementById('row_container');
    var rowCount = tableRef.childElementCount;

    while(rowCount > 0){
        var el = tableRef.rows[0]
        removePlayer(el);
        rowCount--;
    }

}

function spinMidnightGang(){
    var tableRef = document.getElementById('row_container');
    var rowCount = tableRef.childElementCount;
    var playerName = tableRef.querySelector("input");
    var gangMember;

    while(rowCount < 4 ){
        addPlayer();
        gangMember = midnightGang[rowCount];
        playerName =  tableRef.rows[rowCount].querySelector("input");

        console.log(` adding ${gangMember}`);
        playerName.setAttribute("placeholder",`${gangMember}`);
        console.log(playerName);

        rowCount++;
    }

}

function slashDice(){

    // THIS IS UGLY DO BETTER
    TANK_TAKEN = false;
    HEALER_TAKEN = false;

    var tableRef = document.getElementById('row_container');
    var rowCount = tableRef.childElementCount;

    for (let index = 0; index < rowCount; index++) {
        var jobButton = tableRef.rows[index].querySelector("button");
        jobButton.click(); 

    }

}

function lightPartySpin(el){
    var tableRef = document.getElementById('row_container');
    var rowCount = tableRef.childElementCount;
    var playerName = tableRef.querySelector("input");
    var player;

    while(rowCount < 4 ){
        addPlayer();
        player = midnightGang[rowCount];
        playerName =  tableRef.rows[rowCount].querySelector("input");

        console.log(` adding ${player}`);
        playerName.setAttribute("placeholder",`${player}`);
        console.log(playerName);

        rowCount++;
    }
}

function fullPartySpin(el){
    // TDOD: lightPartySpin x 2 
}

// Single job
function jobSpin(el){
    var jobNum = getRandomInt(0,MAX_JOBS);
    console.log("healer_taken = " + HEALER_TAKEN);
    console.log("tank_taken = " + TANK_TAKEN);

    // Okay just kidding, this is uglier
    switch(true) {
        case (TANK_TAKEN && HEALER_TAKEN):
            randDPS(el);
            break;
        case (jobNum > MAX_TANK && jobNum < MAX_HEAL):
            randHealer(el);
            HEALER_TAKEN = true;
            break;
        case (jobNum < MAX_TANK):
            randTank(el);
            TANK_TAKEN = true;
            break;
        default:
            randDPS(el);
            break;
    }
}

function randTank(el){
    return randJob(el, 0, MAX_TANK, TANKS);
}

function randHealer(el){
    return randJob(el, 4, MAX_HEAL, HEALERS);
}

function randDPS(el){
    return randJob(el, 8, MAX_DPS, DPS);
}

// The heart of the spinny zone
function randJob(el,min,max,role){
    var jobNum = getRandomInt(min,max);
    var job = jobNames[jobNum];
    var imgPath = el.querySelector("img");

    console.log(jobNames[jobNum] + " " +jobNum);
    imgPath.setAttribute("src",`${role}${job}.png`);

    console.log(imgPath);
}

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}

function moveFish() {
    var fishVideo = document.getElementById('yt-fish');
    fishVideo.setAttribute("class", `uk-position-top-center`);
    fishVideo.style.display = 'block';

    console.log(fishVideo);

}


// event listeners
const buttonMidnightGang = document.getElementById("midnight-gang");
buttonMidnightGang.addEventListener("click", handler, false);


function handler(){
    spinMidnightGang();
    moveFish();
}


// mouseover on the footer 
function onLoad () {

    var videoElement = document.getElementById('yt-fish');
    videoElement.requestPictureInPicture();

    // set the link for todays weekday
    var day = document.getElementById("weekday");
    day.textContent = `${today()}`;

    var dayVideo = document.getElementById("todayVideo");
    var todayURL = weekdayURL[today()];

    // doing this becuase saturday is age restricted...
    if (today() == 'saturday') {
        day.setAttribute("href", `${todayURL}`);
    }
    
    dayVideo.setAttribute("src", `${todayURL}`);



    var footerImg = document.querySelector("img#helpme");
    var footerText = document.querySelector("div#help");
    var isMouseover = false;
    
    var tick = function () {
        footerText.style.left = ((footerImg.offsetLeft + footerImg.offsetWidth / 2) - 320).toFixed(0) + "px";
        footerText.style.top = ((footerImg.offsetTop + footerImg.offsetWidth / 2) - 115).toFixed(0) + "px";
        footerText.style.display = (isMouseover) ? "block" : "none";
    };
    footerImg.addEventListener("mouseover", function () {
        isMouseover = true;
        tick();
    }, false);
    footerImg.addEventListener("mouseout", function () {
        isMouseover = false;
        tick();
    }, false);
    footerText.addEventListener("mouseover", function () {
        isMouseover = true;
        tick();
    }, false);
    footerText.addEventListener("mouseout", function () {
        isMouseover = false;
        tick();
    }, false);
}

