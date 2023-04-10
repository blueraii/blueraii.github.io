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


function addPlayer(){

    var tableRef = document.getElementById('row_container');
    var row = tableRef.insertRow(-1);

    var img = `<img src=${TANKS}${jobNames[3]}.png>`

    row.innerHTML = '<td><button onclick="jobSpin(this)" class="job"> <img src="img/questionmarkbg.gif"></button></td><td><input class="uk-input uk-form-blank" type="text"  placeholder="Add player name..."> </td><td><button onclick="removePlayer(this)" class="remove" ><img src="img/trash.gif"></button></td>';
}

function removePlayer(el){
        el.closest('tr').remove();
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

        console.log(gangMember);
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

