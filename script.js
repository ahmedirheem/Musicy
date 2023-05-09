let music = new Audio('./vande.mp3'),
backwardBtn = document.querySelector('.backward-audio i'),
playMastery = document.querySelector('.play-mastery i'),
forwardBtn = document.querySelector('.forward-audio i'),
waveAnimation = document.querySelector('.wave'),
playIcons = document.querySelectorAll('.play-menu-song')

const songs = [
    {
        id: '1',
        poster: './1.jpg',
        songInfo: `<h4>On My Way</h4>
        <span>Alan Walker</span>`
    },
    {
        id: '2',
        poster: './2.jpg',
        songInfo: `<h4>Alan Walker-Fade</h4>
        <span>Alan Walker</span>`
    },
    {
        id: '3',
        poster: './3.jpg',
        songInfo: `<h4>Cartoon - On & On</h4>
        <span>Daniel Levi</span>`
    },
    {
        id: '4',
        poster: './4.jpg',
        songInfo: `<h4>Warriyo - Mortals</h4>
        <span>Mortals</span>`
    },
    {
        id: '5',
        poster: './5.jpg',
        songInfo: `<h4>Ertugrul Gazi</h4>
        <span>Ertugrul</span>`
    },
    {
        id: '6',
        poster: './6.jpg',
        songInfo: `<h4>Electronic Music</h4>
        <span>Electro</span>`
    },
    {
        id: '7',
        poster: './7.jpg',
        songInfo: `<h4>Agar Tum Sath Ho</h4>
        <span>Tamashaa</span>`
    },
    {
        id: '8',
        poster: './8.jpg',
        songInfo: `<h4>Suna Hai</h4>
        <span>Neha Kakker</span>`
    },
    {
        id: '9',
        poster: './9.jpg',
        songInfo: `<h4>Dilber</h4>
        <span>Satyameva Jayate</span>`
    },
    {
        id: '10',
        poster: './10.jpg',
        songInfo: `<h4>Duniya</h4>
        <span>Luka Chuppi</span>`
    },
    {
        id: '11',
        poster: './11.jpg',
        songInfo: `<h4>Lagdi Lahore Di</h4>
        <span>Street Dancer 3D</span>`
    },
    {
        id: '12',
        poster: './12.jpg',
        songInfo: `<h4>Putt Jatt Da</h4>
        <span>Putt Jatt Da</span>`
    },
    {
        id: '13',
        poster: './13.jpg',
        songInfo: `<h4>Baarishein</h4>
        <span>Atif Aslam</span>`
    },
    {
        id: '14',
        poster: './14.jpg',
        songInfo: `<h4>Vaaste</h4>
        <span>Dhvani Bhanushali</span>`
    },
    {
        id: '15',
        poster: './15.jpg',
        songInfo: `<h4>Lut Gaye</h4>
        <span>Jubin Nautiyal</span>`
    },
]

playMastery.addEventListener('click', ()=>{
    if(music.paused){
        music.play()
        playMastery.classList.replace('fa-play', 'fa-pause')
        waveAnimation.classList.add('active')
    }else{
        music.pause()
        playMastery.classList.replace('fa-pause', 'fa-play')
        waveAnimation.classList.remove('active')
    }
})
forwardBtn.addEventListener('click', ()=>{
    music.currentTime = music.currentTime + 5
})
backwardBtn.addEventListener('click', ()=>{
    music.currentTime = music.currentTime - 5
})

const makeAllPlay = ()=>{
    playIcons.forEach(element=>{
        element.classList.replace('fa-circle-pause', 'fa-circle-play')
    })
}
const makeAllBackgrounds = ()=>{
    document.querySelectorAll('.song-item').forEach(element=>{
        element.style.background = 'rgba(105, 105, 170, 0)'
    })
}

let posterPlayingSong = document.getElementById('poster-playing-song')
let playingSongInfo = document.getElementById('playing-song-info')
let index;
playIcons.forEach(element=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlay()
        e.target.classList.replace('fa-circle-play', 'fa-circle-pause')
        music.src = `./${index}.mp3`
        posterPlayingSong.src = `./images/${index}.jpg`
        music.play()
        let song_title = songs.filter((ele)=>{
            return ele.id == index
        })
        song_title.forEach(ele=>{
            let songName = ele.songInfo
            playingSongInfo.innerHTML = songName
        })
        playMastery.classList.replace('fa-play', 'fa-pause')
        waveAnimation.classList.add('active')
        music.addEventListener('ended', ()=>{
            playMastery.classList.replace('fa-pause', 'fa-play')
            waveAnimation.classList.remove('active')
        })

        makeAllBackgrounds();
        document.querySelectorAll('.song-item')[index-1].style.background = 'rgba(105, 105, 170, 0.1)'

    })
})

// ////////////////////////////////////

let current_time = document.querySelector('.current-time')
let progress_container = document.querySelector('.progress-container')
let progress_bar = document.querySelector('.progress-bar')
let progress_line = document.querySelector('.progress-line')
let audio_duration = document.querySelector('.audio-duration')

music.addEventListener('timeupdate', ()=>{
    let music_curr = music.currentTime
    let music_dur = music.duration

    let min = Math.floor(music_curr/60)
    let sec = Math.floor(music_curr%60)

    if(sec < 10){
        sec = `0${sec}`
    }
    current_time.innerText = `${min}:${sec}`

    let min1 = Math.floor(music_dur/60)
    let sec1 = Math.floor(music_dur%60)

    if(sec1 < 10){
        sec1 = `0${sec}`
    }
    audio_duration.innerText = `${min1}:${sec1}`

    let percent = `${(music_curr/music_dur)*100}%`
    progress_line.style.width = percent
})

progress_container.addEventListener('click', (e)=>{
    let timelineWidth = progress_container.clientWidth
    music.currentTime = (e.offsetX / timelineWidth) * music.duration
})

/////////////////////////////////
let volume_icon = document.querySelector('.volume-icon i')
let volume_container = document.querySelector('.volume-container')
let volume_bar = document.querySelector('.volume-bar')
let volume_line = document.querySelector('.volume-line')

volume_container.addEventListener('click', (e)=>{
    let timelineWidth = volume_container.clientWidth
    volume_line.style.width = `${(e.offsetX / timelineWidth)*100}%`
    music.volume = e.offsetX / timelineWidth
    
    if(music.volume == 0){
        volume_icon.classList.add('fa-volume-xmark')
        volume_icon.classList.remove('fa-volume-low')
        volume_icon.classList.remove('fa-volume-high')
    }else if(music.volume > 0 & music.volume < 0.5){
        volume_icon.classList.add('fa-volume-low')
        volume_icon.classList.remove('fa-volume-high')
        volume_icon.classList.remove('fa-volume-xmark')
    }else if(music.volume > 0.5){
        volume_icon.classList.add('fa-volume-high')
        volume_icon.classList.remove('fa-volume-low')
        volume_icon.classList.remove('fa-volume-xmark')
    }
    volume_line.style.width = `${music.volume * 100}%`

})
volume_icon.addEventListener('click', ()=>{
    if(volume_icon.classList.contains('fa-volume-high')){
        music.volume = 0.0
        volume_icon.classList.replace('fa-volume-high', 'fa-volume-xmark')
    }else if(volume_icon.classList.contains('fa-volume-low')){
        music.volume = 0.0
        volume_icon.classList.replace('fa-volume-low', 'fa-volume-xmark')
    }else{
        music.volume = 0.5
        volume_icon.classList.replace('fa-volume-xmark', 'fa-volume-high')
    }
    volume_line.style.width = `${music.volume * 100}%`
})
// //////////////////////

music.addEventListener('ended', ()=>{
    playMastery.classList.replace('fa-pause', 'fa-play')
    waveAnimation.classList.remove('active')
})

/////////////////////////////

let left_scrolls = document.getElementById('left-scrolls')
let right_scrolls = document.getElementById('right-scrolls')
let songs_contain = document.querySelector('.songs-contain')

left_scrolls.addEventListener('click', ()=>{
    songs_contain.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    songs_contain.scrollLeft += 330;
})

let left_scroll = document.getElementById('left-scroll')
let right_scroll = document.getElementById('right-scroll')
let artists_contain = document.querySelector('.artists-contain')

left_scroll.addEventListener('click', ()=>{
    artists_contain.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    artists_contain.scrollLeft += 330;
})
