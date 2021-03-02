const signupForm = document.getElementById("signup");
const loginForm = document.getElementById("login");

function onLogin(e) {
  e.preventDefault();
  // console.log(this);
  let userLogin = {
    email: e.target[0].value,
    password: e.target[1].value,
  };
  
  const newUser = fetch("http://localhost:3000/api/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userLogin)
  }).then(response => response.json()).then(data => { 
    console.log(data);
    localStorage.setItem("jwt", JSON.stringify(data.jwt));
    this.reset();
  }).catch(err => console.log(err));

}

loginForm.addEventListener("submit", onLogin);











// const BASE_URL = "http://localhost:3000/api";
// const signup = document.getElementById("signup");



// function onSignup(e) {
//   e.preventDefault();
//   let url = `${BASE_URL}/users`;
//   const data = {
//     email: e.target[0].value,
//     password: e.target[1].value,
//     password_confirmation: e.target[2].value,
//   };
//   fetch(url, {
//     method: 'POST', // or 'PUT'
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }

// signup.addEventListener("submit", onSignup);








// function testingFeth() {  
//   document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM content has loaded");
//     let url = `${BASE_URL}/users/3`;
//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//   });
// }



// testingFeth();

// function onSignup(e) {
//   e.preventDefault();
//   const data = {
//     email: e.target[0].value,
//     password: e.target[1].value,
//     password_confirmation: e.target[2].value,
//   };
//   axios({
//     url: `${BASE_URL}/users`,
//     method: "POST",
//     data: data
//   }).then(response => {
//     console.log(response);
//     console.log("hello");
//     console.log(response.data);
//     this.reset();
//   }).catch(errors => {
//     console.log(errors);
//   });
//   console.log(data);
// }
