// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("sneakersProject JS imported successfully!");
});



//  In profile changing style display to edit container
let editProfileContainerDOM = document.querySelector(".editProfileContainer")
let editProfileDOM = document.querySelector("#editProfile")
const changeDisplay = () =>{
  editProfileContainerDOM.style.display = "block";
}
editProfileDOM.addEventListener('click', changeDisplay)
// *************************************************************************************