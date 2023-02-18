// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("sneakersProject JS imported successfully!");
});



//  In profile changing style display to edit container and create post
let editProfileContainerDOM = document.querySelector(".editProfileContainer")
let createPostContainerDOM = document.querySelector(".createPostContainer")
let imagePostDOM = document.querySelectorAll(".imagePost")
let containerVignetUserDOM = document.querySelector(".containerVignetUser")
let createPostDOM = document.querySelector("#createPost")
let editProfileDOM = document.querySelector("#editProfile")


const changeDisplayEditProfil = () =>{
  editProfileContainerDOM.style.display = "block";
}
const changeDisplayCreatPost = () =>{
  createPostContainerDOM.style.display = "block";
}

const changeDisplayImagePost = () => {
  containerVignetUserDOM.style.display = "block";
}



editProfileDOM.addEventListener('click', changeDisplayEditProfil)
createPostDOM.addEventListener('click', changeDisplayCreatPost)
//imagePostDOM.addEventListener('click', changeDisplayImagePost)
imagePostDOM.forEach((eachOne) =>{
  eachOne.addEventListener('click', changeDisplayImagePost)
})
// *************************************************************************************