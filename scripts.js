const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/crowdpleaser/video/upload';
const CLOUDINARY_UPLOAD_PRESET = 'kvcunjt8';

// elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const videosList = document.querySelector(".videos");
const videos = JSON.parse(localStorage.getItem("videos")) || [];

function debounce(func, wait = 2000, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// function

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
  // console.log("toggle")
}
function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;

}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(this);
}

function updateHandle() {
  video[this.name] = this.value;
  // console.log(this.name);
  // console.log(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', updateHandle));
ranges.forEach(range => range.addEventListener('mousemove', updateHandle));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


// Video Uploading 

const fileUpload = document.getElementById('file-upload');

function cloudinaryUpload(e) {
  console.log(e);
  e.preventDefault();

  const file = e.target[0].files[0];
  var formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
 
  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  }).then(res => {
    console.log(res);
    const text = res.data.secure_url;
    const newVideo = {
      text
    };
    videos.push(newVideo);
    populateList(videos, videosList);
    localStorage.setItem("videos", JSON.stringify(videos));
    this.reset();
  }).catch(err => {
    console.log(err);
  });

}

fileUpload.addEventListener('submit', debounce(cloudinaryUpload));

function populateList(videos = [], videosList) {
  videosList.innerHTML = videos
    .map((video1, i) => {
      return `
  <li>
    <video data-index=${i} id="video${i}" src="${videos[i].text}"></video>
  </li>
`;
    })
    .join("");
}

function chooseVideo(e) {
  if(!e.target.matches("video")) return; // skip this unless it's an input
  const el = e.target;
  console.log(el);
  video.src = el.src;
  // const text = el.dataset.text;
  // video.src = text;
}

videosList.addEventListener("click", chooseVideo);


populateList(videos, videosList);



