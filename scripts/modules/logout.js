function onLogout(e) {
  localStorage.removeItem("jwt");
  const listElement = document.querySelectorAll("#videos li") || [];
  listElement.forEach(item => item.remove());
  console.log("User has ended session");
  document.querySelector(".viewer").src = "./652333414.mp4";
}

export default onLogout;