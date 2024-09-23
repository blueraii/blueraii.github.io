const MAX_JOBS = 21;
const MAX_TANK = 4;
const MAX_HEAL = 8;
const MAX_DPS = 21;
const MAX_ROLES = 5;

const ROLES = "img/00_ROLE/"
const TANKS = "img/01_TANK/Job/";
const HEALERS = "img/02_HEALER/Job/";
const DPS = "img/03_DPS/Job/";

var TANK_TAKEN = false;
var HEALER_TAKEN = false;

var roles = {
    "0": "TankRole",
    "1": "HealerRole",
    "2": "MeleeDPS",
    "3": "RangedDPS",
    "4": "MagicalDPS"
}

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
    "13": "Viper",

    "14": "Bard",
    "15": "Machinist",
    "116": "Dancer",
    
    "17": "BlackMage",
    "18": "Summoner",
    "19": "RedMage",
    "20": "Pictomancer"
}

var weekdayURL = { 
    "sunday": "https://www.youtube.com/embed/WIRK_pGdIdA",
    "monday": "https://www.youtube-nocookie.com/embed/oMQT7txBj0Y",
    "tuesday": "https://www.youtube-nocookie.com/embed/4TYdhafjS44",
    "wednesday": "https://www.youtube-nocookie.com/embed/B_qnI1WrlnU",
    "thursday": "https://www.youtube-nocookie.com/embed/fxV_0CLZhgM",
    "friday": "https://www.youtube-nocookie.com/embed/V_cnK8Cd6Ag",
    "saturday": "https://www.youtube-nocookie.com/embed/9WaYCdQ8FOQ"
}

const weekday = ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

function today(){
    const date = new Date();
    const theDay = weekday[date.getDay()];
    console.log(theDay);
    return theDay;
}

function addPlayer(){

    var tableRef = document.getElementById('row_container');
    var row = tableRef.insertRow(-1);

    var img = `<img src=${TANKS}${jobNames[3]}.png>`

    var job_elem = document.getElementById('job');

    // christ allmighty please change this into something else
    row.innerHTML = '<td><button onclick="jobSpin(this)" class="job" id="job"> <img src="img/questionmarkbg.gif"></button></td><td><input class="uk-input uk-form-blank " type="text"  placeholder="Add player name..."></td> <td><button onClick="randRole(this)" class="role"><img src="img/questionmarkbg.gif"></button></td> <td><button onClick="randTank(this)" class="tank"><img src="img/00_ROLE/TankRole.png"></button></td> <td><button onClick="randHealer(this)" class="healer"><img src="img/00_ROLE/HealerRole.png"></button></td> <td><button onClick="randDPS(this)" class="dps"><img src="img/00_ROLE/DPSRole.png"></button></td> <td><button onclick="removePlayer(this)" class="remove" ><img src="img/trash.gif"></button></td>';
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

function fullPartySpin(el){
    // TDOD: lightPartySpin x 2 
}

// Single job
function jobSpin(el){
    var jobNum = getRandomInt(0,MAX_JOBS);
    console.log("healer_taken = " + HEALER_TAKEN);
    console.log("tank_taken = " + TANK_TAKEN);
    console.log("initial jobNum = " + jobNum);

    // Okay just kidding, this is uglier
    switch(true) {
        case (TANK_TAKEN && HEALER_TAKEN):
            randDPS(el);
            break;
        case (jobNum > MAX_TANK  && jobNum < MAX_HEAL && !HEALER_TAKEN):
            randHealer(el);
            HEALER_TAKEN = true;
            break;
        case (jobNum < MAX_TANK  && !TANK_TAKEN):
            randTank(el);
            TANK_TAKEN = true;
            break;
        default:
            randDPS(el);
            break;
    }
}

// FIXME: gurl, what the fuck are those magic numbers doing, casting spells??  
function randTank(el){
    return randJob(el, 0, MAX_TANK, TANKS, jobNames);
}

function randHealer(el){
    return randJob(el, 4, MAX_HEAL, HEALERS, jobNames);
}

function randDPS(el){
    return randJob(el, 8, MAX_DPS, DPS, jobNames);
}

function randRole(el){
    return randJob(el, 0, MAX_ROLES, ROLES, roles);
}

// The heart of the spinny zone
function randJob(el,min,max,role,names){
    var jobNum = getRandomInt(min,max);
    var job = names[jobNum];
    var imgPath = el.querySelector("img");

    console.log(names[jobNum] + " " +jobNum);
    imgPath.setAttribute("src",`${role}${job}.png`);

    console.log(imgPath);
}

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max - min) + min);
}

function toggleFish() {
    var fishVideo = document.getElementById('yt-fish');
    fishVideo.setAttribute("class", `uk-position-top-center`);
    
    if(fishVideo.style.display == 'none'){
        fishVideo.style.display = 'block';
    }
    else {fishVideo.style.display = 'none';}
}

/*
* id:       tag id, parent of the node where <img> is placed in HTML
* cls:      (optional) class name
* old_src:  name of the gif you want to replace
* new_src:  path to the gif to replace the old one with
*/ 
function replaceGifs(id, old_src, new_src) {
    var ref = document.getElementById(id);
    var gifCount = ref.childElementCount;

    var gifRef = ref.querySelectorAll("img");
    gifRef.forEach(img => {
        if (!img.src.endsWith(old_src)){
        console.log("old src = " + img.src );
        img.src = new_src;
        img.style.scale = '1.0';}
    });

}

function toggleRGBText() {
    var textRef = document.getElementById('scroll-zone');

    var spanRef = textRef.querySelectorAll("span");
    spanRef.forEach(span => {
        if(span.hasAttribute("class"))
        {span.removeAttribute("class");}
        else{
        span.setAttribute("class", `rgb-text`);
        }
    });
}

function activatePS2() {
    var ps2video = document.getElementById('ps2crash');
    ps2video.style.display = 'block';
}

function explosion(el){
    el.setAttribute("src",`img/explosionX3.gif`);
}


// event listeners
const buttonMidnightGang = document.getElementById("midnight-gang");
buttonMidnightGang.addEventListener("click", midnightGangHandler, false);

const jesusps2 = document.getElementById("jesus");
jesusps2.addEventListener("click", jesusHandler, false);

const destroy = document.getElementById("destroyAll");
destroy.addEventListener("click", destroyHandler, false);

var deer = document.getElementById("rundeer");
deer.addEventListener("click", explosion(deer), false);

function jesusHandler(){
    activatePS2();
}

function midnightGangHandler(){
    spinMidnightGang();
    replaceGifs('top-banner', 'fire-under-construction-animation.gif', 'img/dancinghat.gif');
    replaceGifs('scroll-zone', 'wheelchair.gif', 'img/wheelchair_ani.gif');
    toggleFish();
    replaceInText(document.getElementById('scroll-zone'), 'spinny', 'funky');
    toggleRGBText();
}

function destroyHandler(){
    removeAllPlayers();
    toggleFish();
    replaceInText(document.getElementById('scroll-zone'), 'funky', 'spinny');
    toggleRGBText();
}


// mouseover on the footer 
function onLoad () {

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

// Source: https://stackoverflow.com/questions/5558613/replace-words-in-the-body-text
// author: funky-future
// This was better than my janky ass solution
function replaceInText(element, pattern, replacement) {
    for (let node of element.childNodes) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                replaceInText(node, pattern, replacement);
                break;
            case Node.TEXT_NODE:
                node.textContent = node.textContent.replace(pattern, replacement);
                break;
            case Node.DOCUMENT_NODE:
                replaceInText(node, pattern, replacement);
        }
    }
}