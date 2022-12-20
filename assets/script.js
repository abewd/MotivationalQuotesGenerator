var openModal = document.querySelector("#modalBtn")
var modalBox = document.getElementsByClassName("modal")[0]
var closeModal = document.querySelector(".close")
openModal.addEventListener("click", function() {
    modalBox.style.display = "block";
  })

closeModal.addEventListener("click", function(){
    modalBox.style.display = "none";
})


