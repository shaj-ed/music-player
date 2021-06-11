// Songs //
const songs = [
  {
    id: 0,
    name: "The Rose",
    artist: "Conway Twitty",
    song: "./songs/the-rose.mp3",
    cover: "./images/the-rose.jpg",
    album: "Hello Darlin",
  },
  {
    id: 1,
    name: "Ke Sunbe",
    artist: "Indalo",
    song: "./songs/ke-sunbe.mp3",
    cover: "./images/ke-sunbe.jpg",
    album: "Kokhon Kibhabe Ekhane Ke Jane",
  },
  {
    id: 2,
    name: "Everybody Wants To Rule The World",
    artist: "Tears For Fears",
    song: "./songs/everybody-wants.mp3",
    cover: "./images/everybody.jpg",
    album: "Songs from the Big Chair",
  },
  {
    id: 3,
    name: "Amar Shotto",
    artist: "Karnival",
    song: "./songs/amar-shotto.mp3",
    cover: "./images/amar-shotto.jpg",
    album: "Indralay",
  },
  {
    id: 4,
    name: "Blowin'in My Wind",
    artist: "Bob Dylan",
    song: "./songs/blowin-mind.mp3",
    cover: "./images/blowin-mind.jpg",
    album: "Finjan Club 1962",
  },
  {
    id: 5,
    name: "Iron Man",
    artist: "Black Sabbath",
    song: "./songs/iron-man.mp3",
    cover: "./images/iron-man.jpg",
    album: "Paranoid",
  },
  {
    id: 6,
    name: "Poth Chola",
    artist: "Warfaze",
    song: "./songs/poth-chola.mp3",
    cover: "./images/poth-chola.jpg",
    album: "Jibondhara",
  },

  {
    id: 7,
    name: "Immigrant Song",
    artist: "Led Zeppelin",
    song: "./songs/immigrant.mp3",
    cover: "./images/immigrant.png",
    album: "Led Zeppelin III",
  },
];

// Select DOM //
const musicPlayer = document.querySelector(".music-player");
const musicCover = document.querySelector("#cover");
const musicTitle = document.querySelector("#title");
const musicArtist = document.querySelector("#artist");
const musicAudio = document.querySelector("#audio");
const progressContainer = document.querySelector(".music-progress");
const progressBar = document.querySelector(".progress-bar");
const durationUp = document.querySelector("#duration-up");
const duration = document.querySelector("#duration");
const prevButton = document.querySelector("#prev");
const playButton = document.querySelector("#play");
const nextButton = document.querySelector("#next");
const songList = document.querySelector(".songs");
const iconTop = document.querySelector(".icon-top");

let songIndex = 0;

// Events //

// When window load
window.addEventListener("DOMContentLoaded", () => {
  initSongList();
  initSong(songs[songIndex]);

  musicAudio.addEventListener("loadedmetadata", () => {
    duration.innerText = getDuration(musicAudio.duration);
  });
});

// Play the damn song
playButton.addEventListener("click", () => {
  const isPlaying = musicPlayer.classList.contains("play");

  if (!isPlaying) {
    playSong();
  } else {
    pauseSong();
  }
});

// Prev & Next song
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);

// Find music time
musicAudio.addEventListener("timeupdate", currentPlay);

// For update progress bar
progressContainer.addEventListener("click", updateBar);

// When end the music then go to the next song
musicAudio.addEventListener("ended", nextSong);

// Songs list
iconTop.addEventListener("click", () => {
  songList.classList.toggle("show");
});

// Functions //

// Init song list
function initSongList() {
  songs.forEach((song) => {
    const li = document.createElement("li");
    li.classList.add("list");

    li.innerHTML = `
                <img
                src="${song.cover}"
                alt="Cover"
                class="list-cover"
            />
            <div class="list-info" data-id="${song.id}">
                <h2 class="song-title">${song.name}</h2>
                <h3 class="song-artist">${song.artist}</h3>
            </div>
    `;
    songList.appendChild(li);
  });

  const lists = document.querySelectorAll(".list");
  // Play the clicked song
  playClick(lists);
}

// Init Song
function initSong(song) {
  musicCover.src = song.cover;
  musicAudio.src = song.song;
  musicTitle.textContent = song.name;
  musicArtist.textContent = song.artist;
}

// Play song
function playSong() {
  musicPlayer.classList.add("play");
  const buttonIcon = playButton.querySelector("#play img");
  buttonIcon.src = "./images/pause-outline.svg";

  musicAudio.play();
}

// Pause song
function pauseSong() {
  musicPlayer.classList.remove("play");
  const buttonIcon = playButton.querySelector("#play img");
  buttonIcon.src = "./images/play-outline.svg";

  musicAudio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  initSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  initSong(songs[songIndex]);
  playSong();
}

// Progress Bar
function currentPlay(e) {
  const duration = e.srcElement.duration;
  const currentTime = e.srcElement.currentTime;
  let updateBar = (currentTime / duration) * 100;

  durationUp.innerText = getDuration(currentTime);
  progressBar.style.width = `${updateBar}%`;
}

// Update bar
function updateBar(e) {
  const barWidth = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = musicAudio.duration;

  musicAudio.currentTime = (clickX / barWidth) * duration;
}

// Get audio duration
function getDuration(duration) {
  let minutes = Math.floor(duration / 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let seconds = Math.floor(duration % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
}

// Play the clicked song
function playClick(lists) {
  lists.forEach((list) => {
    list.addEventListener("click", (e) => {
      const listInfo = list.querySelector(".list-info");
      const listId = listInfo.dataset.id;

      songIndex = listId;

      initSong(songs[songIndex]);
      songList.classList.remove("show");
      playSong();
    });
  });
}
