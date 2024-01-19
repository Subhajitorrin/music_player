{
    async function getPlaylists() {
        let a = await fetch("http://127.0.0.1:3000/songs/")
        let response = await a.text()
        let div = document.createElement('div');
        div.innerHTML = response;
        let as = div.getElementsByTagName('a');
        let playlistArray = [];
        for (let i = 0; i < as.length; i++) {
            let ele = as[i];
            if (ele.innerText.endsWith("Playlist/")) {
                let temp = ele.innerText;
                temp = temp.slice(0, temp.length - 10)
                playlistArray.push(temp)
            }
        }
        return playlistArray;
    }
    async function getIcons() {
        let a = await fetch("http://127.0.0.1:3000/songs/_icons/")
        let response = await a.text();
        let div = document.createElement('div')
        div.innerHTML = response;
        let as = div.getElementsByTagName('a');
        let iconsArray = []
        for (let i = 0; i < as.length; i++) {
            let ele = as[i]
            if (ele.href.endsWith("jpeg")) {
                iconsArray.push(ele.href)
            }
        }
        return iconsArray;
    }
    async function setPlaylist() {
        let playlistArray = await getPlaylists();
        let iconsArray = await getIcons();
        for (let i = 0; i < playlistArray.length; i++) {
            let playlist = document.querySelector('.playlists');
            let card = createPlaylistCard(playlistArray[i], iconsArray[i])
            playlist.appendChild(card)
        }
    }
    setPlaylist()

    // create playlist card
    function createPlaylistCard(artistName, iconLink) {
        // create playlist card
        var cardContainer = document.createElement('div');
        cardContainer.className = 'card';

        // Create the image container
        var imgContainer = document.createElement('div');
        imgContainer.className = 'imgcontainer';

        // Create the image element
        var imgElement = document.createElement('img');
        imgElement.src = iconLink;
        imgElement.alt = '';

        // Append the image to the image container
        imgContainer.appendChild(imgElement);

        // Create the title and description container
        var titleContainer = document.createElement('div');

        // Create the title element
        var titleElement = document.createElement('h2');
        titleElement.className = 'cardh2';
        titleElement.textContent = artistName;

        // Create the description element
        var descriptionElement = document.createElement('p');
        descriptionElement.textContent = 'Songs for you';

        // Append the title and description to the title container
        titleContainer.appendChild(titleElement);
        titleContainer.appendChild(descriptionElement);

        // Append the image container and title container to the card container
        cardContainer.appendChild(imgContainer);
        cardContainer.appendChild(titleContainer);

        // Append the card container to the body or any other desired parent element
        document.body.appendChild(cardContainer);

        return cardContainer;
    }
}
{
    async function getSongs() {
        let a = await fetch("http://127.0.0.1:3000/songs/")
        let response = await a.text()
        let div = document.createElement('div')
        div.innerHTML = response;
        let as = div.getElementsByTagName('a')
        let playlistlinks = []
        for (let i = 1; i < as.length - 1; i++) {
            playlistlinks.push(as[i].href)
        }
        return playlistlinks;
    }

    async function main3() {
        let playlistlinks = await getSongs()
        let card = document.querySelectorAll('.card')
        card.forEach((card, index) => {
            card.addEventListener('click', () => {
                fetchSongs(playlistlinks[index])
            });
        });

    }
    setTimeout(() => {
        main3();
    }, 100);

    function createSongCard(songlink, songname) {
        // Create a new music card element
        const musicCard = document.createElement('div');
        musicCard.classList.add('musicard');

        // Create the first inner div
        const innerDiv1 = document.createElement('div');

        // Create the music icon
        const musicIcon = document.createElement('i');
        musicIcon.classList.add('bx', 'bx-music');
        innerDiv1.appendChild(musicIcon);

        // Create the heading div
        const headingDiv = document.createElement('div');
        headingDiv.classList.add('heading');

        // Create the song name heading
        const songNameHeading = document.createElement('h3');
        songNameHeading.textContent = songname;
        headingDiv.appendChild(songNameHeading);

        // Create the artist paragraph
        const artistParagraph = document.createElement('p');
        artistParagraph.textContent = 'Artist';
        headingDiv.appendChild(artistParagraph);

        // Append headingDiv to innerDiv1
        innerDiv1.appendChild(headingDiv);

        // Append innerDiv1 to musicCard
        musicCard.appendChild(innerDiv1);

        // Create the second inner div for the play button
        const innerDiv2 = document.createElement('div');
        innerDiv2.classList.add('play');

        // Create the play icon
        const playIcon = document.createElement('i');
        playIcon.classList.add('bx', 'bx-play-circle');
        innerDiv2.appendChild(playIcon);

        // Append innerDiv2 to musicCard
        musicCard.appendChild(innerDiv2);

        // Create an anchor element
        const anchorElement = document.createElement('a');
        anchorElement.href = songlink;

        // Append musicCard to the anchor element
        musicCard.appendChild(anchorElement);

        // Append the anchor element to the currentsongs container
        let currentsongs = document.querySelector('.currentsongs');
        currentsongs.appendChild(musicCard);
        // console.log(musicCard);

    }
    async function fetchSongs(url) {
        let a = await fetch(url);
        let response = await a.text();
        let div = document.createElement('div')
        div.innerHTML = response;
        let as = div.getElementsByTagName('a')
        let songlink = []
        let songname = []
        for (let i = 1; i < as.length; i++) {
            songlink.push(as[i].href);
            songname.push(as[i].innerText.slice(0, as[i].innerText.length - 4));
        }

        // inserting songs in now playing song section
        let myDiv = document.querySelector(".currentsongs")
        while (myDiv.firstChild) {
            myDiv.removeChild(myDiv.firstChild);
        }
        for (let i = 0; i < songlink.length; i++) {
            createSongCard(songlink[i], songname[i]);
        }

        playCurrentSong()

    }

    function playCurrentSong() {
        let musicard = document.querySelectorAll(".musicard");
        musicard.forEach((ele, index) => {
            ele.addEventListener('click', () => {
                updateCurrentSong(ele)
                // let link = ele.querySelector('a').getAttribute('href');
                // let song = new Audio(link);
                // song.play();
            });
        });
    }

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

        let link = ele.querySelector('a').getAttribute('href');
        // Store the reference to the new audio element in the global variable
        currentSong = new Audio(link);

        currentSong.play();

        // Update the range input value during playback
        currentSong.addEventListener('timeupdate', () => {
            rangeInput.value = (currentSong.currentTime / currentSong.duration) * 100;
        });

        // Update the playback time when the range input is changed
        rangeInput.addEventListener('input', () => {
            const seekTime = (rangeInput.value / 100) * currentSong.duration;
            currentSong.currentTime = seekTime;
        });

        playbtn.addEventListener('click', () => {
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
}
// hamburger
let menu=document.querySelector(".menu");
menu.addEventListener('click',function(){
    let left=document.querySelector(".left");
    left.classList.toggle('active');
})

let x=document.querySelector(".x");
x.addEventListener('click',function(){
    let left=document.querySelector(".left");
    left.classList.toggle('active');
})

/**
 * 
 * <audio>
        <source src="" type="audio/mp3">
    </audio>
 */