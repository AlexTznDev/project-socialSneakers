// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("sneakersProject JS imported successfully!");
});



//  In profile changing style display to edit container and create post
let editProfileContainerDOM = document.querySelector(".editProfileContainer")
let createPostContainerDOM = document.querySelector(".createPostContainer")
let createPostDOM = document.querySelector("#createPost")
let editProfileDOM = document.querySelector("#editProfile")

// let imagePostDOM = document.querySelectorAll(".imagePost")
// let containerVignetUserDOM = document.querySelector(".containerVignetUser")





const changeDisplayEditProfil = () =>{
  editProfileContainerDOM.style.display = "block";
}
const changeDisplayCreatPost = () =>{
  createPostContainerDOM.style.display = "block";
}

// const changeDisplayImagePost = () => {
//   if(containerVignetUserDOM.style.display === "none"){ 
//   containerVignetUserDOM.style.display = "block";}
//   else if(containerVignetUserDOM.style.display ==="block"){
//     containerVignetUserDOM.style.display = "none"
//   }
// }



editProfileDOM.addEventListener('click', changeDisplayEditProfil)
createPostDOM.addEventListener('click', changeDisplayCreatPost)
//imagePostDOM.addEventListener('click', changeDisplayImagePost)
// imagePostDOM.forEach((eachOne) =>{
//   eachOne.addEventListener('click', changeDisplayImagePost)
// })
// *************************************************************************************