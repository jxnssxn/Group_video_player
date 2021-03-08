import { populateList, populateStorage } from "./library.js";

function onUpload (e) {
  e.preventDefault();
  console.log(e.target.files[0]);
  const formData = new FormData();
  formData.append("body", e.target.files[0]);

  fetch("http://localhost:3000/api/videos", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`
    },
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      populateList(data.videos.map(video => video.url), document.querySelector("#videos"));
      this.reset();
    })
  ;
}

export default onUpload;