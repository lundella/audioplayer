class AudioSource {
    constructor(name, time) {
        this.name = name;
        this.time = time;
    }
}

const file1 = new AudioSource("Yes or Yes", 269);
const file2 = new AudioSource("너를 만나", 292);
const file3 = new AudioSource("Tempo", 242);
const file4 = new AudioSource("삐삐", 219);
const file5 = new AudioSource("가을 타나 봐", 233);
const file6 = new AudioSource("수퍼비와", 269);
const file7 = new AudioSource("고백", 232);
const file8 = new AudioSource("멋지게 인사하는 법", 202);
const file9 = new AudioSource("NoNo", 330);
const file10 = new AudioSource("시간이 들겠지", 246);
// const file2 = new AudioSource("모든 날, 모든 순간", "3:31");

const list = [file1, file2, file3, file4, file5, file6, file7, file8, file9, file10];
const checkedList = [];

let playLists = [list];


class Time {
    constructor(time) {
        this.time = time;
        this.minutes = Math.floor(time / 60);
        this.seconds = (time % 60);
    }

    getPlayTime() {
        return (this.minutes > 9 ? this.minutes : ("0" + this.minutes)) + ":" + (this.seconds > 9 ? this.seconds : ("0" + this.seconds));
    }
}

let playFile = "";
let playTime = "";

const setMusicFile = function (file) {
    if(!file) {return;}
    playFile = file;
    playTime = new Time(file.time);
    const playControlArea = document.getElementById("playControlArea");
    playControlArea.getElementsByClassName("name")[0].textContent = file ? file.name : "--";
    playControlArea.getElementsByClassName("time")[0].textContent = file ? playTime.getPlayTime() : "--";
}

setMusicFile(playFile);

const togglePlay = function() {
    if(playing) {
        playButton.style.display = "none";
        pauseButton.style.display = "inline-block";
    } else {
        pauseButton.style.display = "none";
        playButton.style.display = "inline-block";
    }
}


// checked list initiation
// checked list save specific list
// remove list item and list
const resourceListElement = document.getElementById("resourceList");
let playingList = [];
const listSelection = function() {
    if (checkedList.length) playingList = checkedList;
}

playingListInit(list);


let playing = null;
const playMusic = function() {
    if (!playFile) setMusicFile(playingList[0]);

    playing = setInterval(() => {
        if (!playTime.seconds && !playTime.minutes) {
            pauseMusic();
            nextButton.click();

            if (playFile !== playingList[playingList.length-1]) {
                playMusic()
            } else {
                stopMusic();
                return;
            }
        } else if (!playTime.seconds) {
            playTime.minutes -= 1;
            playTime.seconds = 60;
        }
        playTime.seconds -= 1;
        playControlArea.getElementsByClassName("time")[0].textContent = "- " + playTime.getPlayTime();
    }, 1000)
    togglePlay();
}
const pauseMusic = function() {
    clearInterval(playing);
    playing = null;
    togglePlay();
}

const stopMusic = function() {
    if (playing) {
        pauseMusic();
    }
    playTime = new Time(playFile.time);
    playControlArea.getElementsByClassName("time")[0].textContent = playTime.getPlayTime();
}

const playButton = document.getElementById("play");
playButton.addEventListener("click", ()=> {
    playMusic();
})

const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", ()=> {
    pauseMusic();
})

const stopButton = document.getElementById("stop");
stopButton.addEventListener("click", ()=> {
    stopMusic();
})

const prevButton = document.getElementById("prev");
prevButton.addEventListener("click", ()=> {
    playingList.forEach((value, index)=> {
        if((index > 0) && value === playFile) {
            setMusicFile(playingList[index-1]);
            return;
        }
    })
})

const nextButton = document.getElementById("next");
nextButton.addEventListener("click", ()=> {
    let currentSet = playFile;
    playingList.forEach((value, index) => {
        if ((index < playingList.length-1) && value === currentSet) {
            setMusicFile(playingList[index+1]);
            return;
        }
    })
})

let highlightResource = "";

function removeResourceList(){
    let list = document.getElementById("resourceList");
    let resources = document.getElementsByClassName("resource");
    while(resources.length) {
        list.removeChild(resources[0]);
    }
}

function playingListInit(list) {
    
    removeResourceList();
    playingList = list;

    list.forEach((file, index) => {
        const playTime = new Time(file.time);
        const checkboxElement = document.createElement("input");
        checkboxElement.setAttribute("type", "checkbox");
        checkboxElement.setAttribute("class", "selection");
        checkboxElement.addEventListener("click", () => {
            if (checkboxElement.checked) {
                checkedList.push(file);
            } else {
                checkedList.splice(checkedList.indexOf(file), 1);
            }
            listSelection();
        })

        const nameElement = document.createElement("div");
        nameElement.className = "name";
        nameElement.textContent = file.name;

        const timeElement = document.createElement("div");
        timeElement.className = "time";
        timeElement.textContent = playTime.getPlayTime();

        const fileElement = document.createElement("div");
        fileElement.addEventListener("dblclick", (e) => {
            if (file !== playFile) {
                setMusicFile(file);
                playMusic();
            }
        })

        fileElement.addEventListener("click", (e) => {
            if (highlightResource && highlightResource.style.backgroundColor === "yellow") {
                highlightResource.style.backgroundColor = "transparent";
            }
            fileElement.style.backgroundColor = "yellow";
            highlightResource = fileElement;
        })

        fileElement.className = "resource";
        fileElement.append(checkboxElement)
        fileElement.append(nameElement);
        fileElement.append(timeElement);

        resourceListElement.appendChild(fileElement);
    })
}

const listButtonsArea = document.getElementById("listButtonsArea");
const addListButton = document.getElementById("addList");
const deleteResourceButton = document.getElementById("deleteResource");

addListButton.addEventListener("click", ()=> {
    let addingList = [];
    const addingButton = document.createElement("button");
    

    addingButton.setAttribute("id", "playlist" + Object.keys(playLists).length);
    addingButton.textContent = "재생 목록" + Object.keys(playLists).length;
    checkedList.forEach((resource, index)=> {
        addingList.push(resource);
    })
    playLists.push(addingList);

    addingButton.addEventListener("click", ()=>{
        playingListInit(addingList);
    });
    listButtonsArea.children[0].append(addingButton);
    unchecked();
})
deleteResourceButton.addEventListener("click", ()=> {

})

const unchecked = function() {
    let checkboxes = document.getElementsByClassName("selection");
    let index = 0;
    
    while(index < checkboxes.length) {
        checkboxes[index].checked = false;
        index++;
    }
    
}
const getAllResourcesButton = document.getElementById("all");
getAllResourcesButton.addEventListener("click", ()=>{
    playingListInit(list);
})

//TODO playlist button add
//TODO now playlist naming cleaning

// module.exports = {
//     test: function () {
//         console.log('text js');
//     }
// }