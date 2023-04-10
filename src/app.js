const MAX_JOBS = 19;
const MAX_TANK = 4;
const MAX_HEAL = 8;
const MAX_DPS = 19;

const TANKS = "img/01_TANK/Job/";
const HEALERS = "img/02_HEALER/Job/";
const DPS = "img/03_DPS/Job/";

var TANK_TAKEN = false;
var HEALER_TAKEN = false;

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

function slashDice(){
    // Reset
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

    switch(true) {
        case (TANK_TAKEN && HEALER_TAKEN):
            randJob(el, 8, MAX_DPS, DPS);
            break;
        case (jobNum > MAX_TANK && jobNum < MAX_HEAL):
            randJob(el, 4, MAX_HEAL, HEALERS);
            HEALER_TAKEN = true;
            break;
        case (jobNum < MAX_TANK):
            randJob(el, 0, MAX_TANK, TANKS);
            TANK_TAKEN = true;
            break;
        default:
            randJob(el, 8, MAX_DPS, DPS);
            break;
    }
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

