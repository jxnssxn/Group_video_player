import { populateList, populateStorage } from "./library.js";

function onLogin(e) {
  e.preventDefault();
  const loginData = {
    email: e.target[0].value,
    password: e.target[1].value,
  };
  fetch("http://localhost:3000/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginData)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(data => {
      console.log(data);
      const links = data.user.videos.map(video => video.url);
      localStorage.setItem("jwt", data.jwt);
      populateList(links, document.querySelector("#videos"));
    })
    .catch(err => console.log(err.statusText));
  this.reset();
}

export default onLogin;
