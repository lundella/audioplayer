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

var list = [ file1, file2, file3, file4, file5, file6, file7, file8, file9, file10 ];

function Time(time) {
    this.time = time;
    this.minutes = Math.floor(time / 60);
    this.seconds = (time % 60)

    this.getPlayTime = function () {
        return this.minutes + ":" + (this.seconds > 9 ? this.seconds : ("0" + this.seconds));
    }
}





// module.exports = {
//     test2: function() {
//         console.log('text2 js');
//     }
// }