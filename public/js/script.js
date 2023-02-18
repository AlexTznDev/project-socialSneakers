// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("sneakersProject JS imported successfully!");
});



//  In profile changing style display to edit container and create post
let editProfileContainerDOM = document.querySelector(".editProfileContainer")
let createPostContainerDOM = document.querySelector(".createPostContainer")
let createPostDOM = document.querySelector("#createPost")
let editProfileDOM = document.querySelector("#editProfile")

const changeDisplayEditProfil = () =>{
  editProfileContainerDOM.style.display = "block";
}
const changeDisplayCreatPost = () =>{
  createPostContainerDOM.style.display = "block";
}


editProfileDOM.addEventListener('click', changeDisplayEditProfil)
createPostDOM.addEventListener('click', changeDisplayCreatPost)
// *************************************************************************************