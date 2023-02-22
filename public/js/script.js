// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("sneakersProject JS imported successfully!");

  //****************************************************
  let editProfileDOM = document.querySelector("#editProfile");
  let editProfileContainerDOM = document.querySelector(".editProfileContainer");
  if (editProfileDOM !== null && editProfileContainerDOM !== null) {
    editProfileDOM.addEventListener("click", () => {
      editProfileContainerDOM.style.display = "block";
    });
  }

  let createPostContainerDOM = document.querySelector(".createPostContainer");
  let createPostDOM = document.querySelector("#createPost");
  if(createPostContainerDOM !== null && createPostDOM !== null){
      createPostDOM.addEventListener("click", () => {
      createPostContainerDOM.style.display = "flex";
  });
  }


  let editPostButtonDOM = document.querySelector("#editPostButton");
  let editPostContainerDOM = document.querySelector(".editPostContainer");
  if(editPostButtonDOM !== null && editPostContainerDOM !== null){
      editPostButtonDOM.addEventListener("click", () => {
    editPostContainerDOM.style.display = "block";
  });
  }

  // *************************************************************************************
});

