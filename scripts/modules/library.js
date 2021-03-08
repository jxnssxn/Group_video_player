function populateStorage(links) {
  localStorage.setItem("videos", JSON.stringify(links));
}

function populateList(vids = [], list) {
  list.innerHTML = vids.map((vid, i) => {
    return `
      <li>
        <video data-index=${i} id="video${i}" src="${vids[i]}"></video>
      </li>
    `;
  }).join("");
}




export { populateStorage, populateList };