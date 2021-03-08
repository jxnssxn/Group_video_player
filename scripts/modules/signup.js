function onSignup(e) {
  e.preventDefault();
  const signupData = {
    name: e.target[0].value,
    email: e.target[1].value,
    password: e.target[2].value,
    password_confirmation: e.target[3].value,
  };
  console.log(signupData);
  fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(signupData)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  this.reset();
}

export default onSignup;