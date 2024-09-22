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
const allSongsImg = ['img/next-semestr-img.jpg',
                    'img/lavish-img.png',
                    'img/midwest-indigo-img.jpg'];

let isPlay = false;
let playNum = 0;

function play() {
    audio.currentTime = 0;
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
    play();
}

function playPrew() {
    playNum -= 1;
    if(playNum < 0) {playNum = allSongs.length - 1}
    changeInfo();
    play();
}

function changeInfo() {
    currentSong.src = allSongs[playNum];
    songImage.style.backgroundImage = `url(${allSongsImg[playNum]})`;
    songName.innerHTML = allSongsNames[playNum];
    playButton.classList.add('pause');
}

playButton.addEventListener('click', () => {
    playButton.classList.toggle('pause');
    (!isPlay) ? play() : pause();
})

nextButton.addEventListener('click', playNext);

prewButton.addEventListener('click', playPrew);

audio.addEventListener("ended", playNext);

