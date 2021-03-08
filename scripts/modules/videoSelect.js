function chooseVideo(e) {
  if(!e.target.matches("video")) return; 
  const el = e.target;
  console.log(el);
  document.querySelector('.viewer').src = el.src;
}

export default chooseVideo;


