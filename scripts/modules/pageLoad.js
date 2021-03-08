import { populateList } from "./library.js";

function onPageLoad(videosList) {
  fetch("http://localhost:3000/api/users/1", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      populateList(data.videos.map(video => video.url), videosList);
    })
    .catch(err => console.log(err));
}



export default onPageLoad;