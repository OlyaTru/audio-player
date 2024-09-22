const audio = document.querySelector('audio');
const currentSong = document.querySelector('.current-song');
const songImage = document.querySelector('.song-img');
const songName = document.querySelector('.song-name');
const prewButton = document.querySelector('.prew-btn');
const playButton = document.querySelector('.play-btn');
const nextButton = document.querySelector('.next-btn');
const progressBar = document.querySelector('.progress-bar-range');
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');

const allSongs = ['music/next-semestr.mp3', 'music/lavish.mp3', 'music/midwest-indigo.mp3']
const allSongsNames = ['Next Semestr', 'Lavish', 'Midwest Indigo'];
const allSongsImg = ['img/player-img01.jpg',
                    'img/player-img02.jpg',
                    'img/player-img03.jpg'];

let isPlay = false;
let playNum = 0;
let mouseDownOnSlider = false;

audio.currentTime = 0;

window.addEventListener("load", () => {
    setProgresTime();
});

function play() {
    audio.play();
    isPlay = true;
}

function pause() {
    audio.pause();
    isPlay = false;
}

function playNext() {
    playNum += 1;
    if(playNum > (allSongs.length - 1)) {playNum = 0}
    changeInfo();
    audio.currentTime = 0;
    play();
}

function playPrew() {
    playNum -= 1;
    if(playNum < 0) {playNum = allSongs.length - 1}
    changeInfo();
    audio.currentTime = 0;
    play();
}

function changeInfo() {
    currentSong.src = allSongs[playNum];
    songImage.style.backgroundImage = `url(${allSongsImg[playNum]})`;
    songName.innerHTML = allSongsNames[playNum];
    playButton.classList.add('pause');
}

function getTimeFromNum(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds = seconds - minutes * 60;
    if(seconds < 10) {seconds = '0' + seconds}
    return `0${minutes}:${seconds}`;
}

function setProgresTime() {
    currentTime.innerHTML = getTimeFromNum(audio.currentTime);
    durationTime.innerHTML = getTimeFromNum(audio.duration);
}

playButton.addEventListener('click', () => {
    playButton.classList.toggle('pause');
    (!isPlay) ? play() : pause();
});

nextButton.addEventListener('click', playNext);

prewButton.addEventListener('click', playPrew);

audio.addEventListener('loadeddata', () => {
    progressBar.value = 0;
    setProgresTime();
})

audio.addEventListener('ended', playNext);

audio.addEventListener("timeupdate", () => {
    if (!mouseDownOnSlider) {
        progressBar.value = audio.currentTime / audio.duration * 100;
        setProgresTime();
    }
});

progressBar.addEventListener('change', () => {
    const onePart = progressBar.value / 100;
    audio.currentTime = (audio.duration || 0) * onePart;
})

progressBar.addEventListener("mousedown", () => {
    mouseDownOnSlider = true;
});

progressBar.addEventListener("mouseup", () => {
    mouseDownOnSlider = false;
});