function AudioFile(name, time) {
    this.name = name;
    this.time = time;
}

var file1 = new AudioFile("Yes or Yes", 269);
var file2 = new AudioFile("너를 만나", 292);
var file3 = new AudioFile("Tempo", 242);
var file4 = new AudioFile("삐삐", 219);
var file5 = new AudioFile("가을 타나 봐", 233);
var file6 = new AudioFile("수퍼비와", 269);
var file7 = new AudioFile("고백", 232);
var file8 = new AudioFile("멋지게 인사하는 법", 202);
var file9 = new AudioFile("NoNo", 330);
var file10 = new AudioFile("시간이 들겠지", 246);
// var file2 = new AudioFile("모든 날, 모든 순간", "3:31");

var list = [file1, file2, file3, file4, file5, file6, file7, file8, file9, file10];
var checkedList = [];

function Time(time) {
    this.time = time;
    this.minutes = Math.floor(time / 60);
    this.seconds = (time % 60)

    this.getPlayTime = function() {
        return this.minutes + ":" + (this.seconds > 9 ? this.seconds : ("0" + this.seconds));
    }
}

var playFile = "";
var playTime = "";

var setMusicFile = function (file) {
    if(!file) {return;}
    playFile = file;
    console.log(file);
    playTime = new Time(file.time);
    var playWindow = document.getElementById("playWindow");
    playWindow.getElementsByClassName("name")[0].textContent = file ? file.name : "-";
    playWindow.getElementsByClassName("time")[0].textContent = file ? playTime.getPlayTime() : "-";
}

setMusicFile(playFile);

console.log(playWindow);

var togglePlay = function() {
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
var playingList = list;
var listSelection = function() {
    if (checkedList.length) playingList = checkedList;
}


var playing = null;
var playMusic = function() {

    
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
        console.log(playTime.minutes, playTime.seconds);
        playTime.seconds -= 1;
        playWindow.getElementsByClassName("time")[0].textContent = "- " + playTime.getPlayTime();
    }, 1000)
    togglePlay();
}
var pauseMusic = function() {
    clearInterval(playing);
    playing = null;
    togglePlay();
}

var stopMusic = function() {
    if (playing) {
        pauseMusic();
    }
    playTime = new Time(playFile.time);
    playWindow.getElementsByClassName("time")[0].textContent = playTime.getPlayTime();
}

var playButton = document.getElementById("play");
playButton.addEventListener("click", ()=> {
    playMusic();
})

var pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", ()=> {
    pauseMusic();
})

var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", ()=> {
    stopMusic();
})

var prevButton = document.getElementById("prev");
prevButton.addEventListener("click", ()=> {
    list.forEach((value, index)=> {
        if((index > 0) && value === playFile) {
            setMusicFile(list[index-1]);
            return;
        }
    })
})

var nextButton = document.getElementById("next");
nextButton.addEventListener("click", ()=> {
    let currentSet = playFile;
    list.forEach((value, index) => {
        if ((index < list.length-1) && value === currentSet) {
            setMusicFile(list[index+1]);
            return;
        }
    })
})

var filesElement = document.getElementsByClassName("files")[0];

list.forEach((file, index) => {
    var playTime = new Time(file.time);
    var checkboxElement = document.createElement("input");
    checkboxElement.setAttribute("type", "checkbox");
    checkboxElement.addEventListener("click", ()=> {
        if(checkboxElement.checked) {
            checkedList.push(file);
        } else {
            checkedList.splice(checkedList.indexOf(file), 1);
        }
    })

    var nameElement = document.createElement("div");
    nameElement.className = "name";
    nameElement.textContent = file.name;

    var timeElement = document.createElement("div");
    timeElement.className = "time";
    timeElement.textContent = playTime.getPlayTime();

    var fileElement = document.createElement("div");
    fileElement.addEventListener("click", (e) => {
        setMusicFile(file);
    })
    fileElement.className = "file";
    fileElement.append(checkboxElement)
    fileElement.append(nameElement);
    fileElement.append(timeElement);

    filesElement.appendChild(fileElement);
})

// module.exports = {
//     test: function () {
//         console.log('text js');
//     }
// }