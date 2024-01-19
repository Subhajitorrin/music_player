let musicard = document.querySelectorAll(".musicard");

for (let i = 0; i < musicard.length; i++) {
  let temp = musicard[i].querySelector("audio");

  // Attach a click event listener to each music card
  musicard[i].addEventListener("click", function () {
    // Play the associated audio when the user clicks the music card
    updateCurrentSong(temp);
    // temp.play();
  });
}

///////////////////
let currentSong;

function updateCurrentSong(ele) {
  let flag = 0;
  let playbtn = document.querySelector("#play");
  let rangeInput = document.querySelector("#myRange");

  // Stop the currently playing song before starting a new one
  if (currentSong) {
    currentSong.pause();
  }

  if (flag == 0) {
    playbtn.innerHTML = `<i class='bx bx-pause'></i>`;
    flag = 1;
  } else {
    playbtn.innerHTML = `<i class="bx bx-play"></i>`;
    flag = 0;
  }

  let link = ele.currentSrc;
  // Store the reference to the new audio element in the global variable
  currentSong = new Audio(link);

  currentSong.play();

  // Update the range input value during playback
  currentSong.addEventListener("timeupdate", () => {
    rangeInput.value = (currentSong.currentTime / currentSong.duration) * 100;
  });

  // Update the playback time when the range input is changed
  rangeInput.addEventListener("input", () => {
    const seekTime = (rangeInput.value / 100) * currentSong.duration;
    currentSong.currentTime = seekTime;
  });

  playbtn.addEventListener("click", () => {
    if (flag == 0) {
      playbtn.innerHTML = `<i class='bx bx-pause'></i>`;
      flag = 1;
      currentSong.play();
    } else {
      playbtn.innerHTML = `<i class="bx bx-play"></i>`;
      flag = 0;
      currentSong.pause();
    }
  });
}
