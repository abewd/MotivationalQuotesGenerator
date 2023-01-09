// Adding variables for the Modals
var openModal = document.querySelector("#modalBtn");
var modalBox = document.getElementsByClassName("modal")[0];
var closeModal = document.querySelector(".close");
var submitBtn = document.querySelector("#submitGoal");

// Open modal using an event listener, in this case its 1 click
openModal.addEventListener("click", function () {
  modalBox.style.display = "block";
});

// Closing the modal using an event listener, in this case its 1 click
closeModal.addEventListener("click", function () {
  modalBox.style.display = "none";
});

//Save user's name and goal in local storage
function saveToLocal() {
  var userName = document.querySelector("#userName").value.trim();
  var userGoal = document.querySelector("#myGoal").value.trim();

  // Assign text input for the Username and the Goal
  var userGoal = {
    name: userName,
    goal: userGoal,
  };

  // Save the username and goal to local storage, as strings
  localStorage.setItem("savedGoal", JSON.stringify(userGoal));

  printGoal();
}

//Retrieve data from local storage, if no data, print no name and ... as goal on the page instead
function printGoal() {
  var savedUserGoal = JSON.parse(localStorage.getItem("savedGoal")) || {
    name: "",
    goal: "...",
  };

  // Display the Goal in the console
  console.log(savedUserGoal);

  // Add variables for the Username and the Goal
  var savedUser = document.querySelector("#savedUser");
  savedUser.textContent = savedUserGoal.name;
  var savedGoal = document.querySelector("#savedGoal");
  savedGoal.textContent = savedUserGoal.goal;
}

// Add funciton to button to open/close modal
submitBtn.addEventListener("click", function () {
  console.log("Saving!");
  saveToLocal();
  modalBox.style.display = "none";
  getImg();
  getQuote();
});

// Print goal to the screen
printGoal();

// This is our access key for the API (photos)
// Creating variables to display the API's contents
var accessKey = "aoHR-Un2l_uxsLT6clT61cCEzrmim18upkshDbMvrPU";
var getUrl = "https://api.unsplash.com/photos/random/?client_id=" + accessKey;
var randomImg = document.querySelector("#randomImg");
var imgSource = document.querySelector("#imgLink");
var imgCreator = document.querySelector("#creator");
var lastImg = localStorage.getItem("lastImg");
var randomQuote = document.querySelector("#quote");

// Function which will display the image, and save it to a local storage
function getImg() {
  fetch(getUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      randomImg.src = data.urls.regular;
      // Formating the API content
      imgSource.setAttribute("href", data.links.html);
      imgCreator.textContent = data.user.name;
      imgCreator.setAttribute("href", data.user.portfolio_url);
      localStorage.setItem("lastImg", data.urls.regular);
    });
}
//Retrieve img & quote saved in local storage so it appears on page even after refreshing
randomImg.src = lastImg;
savedQuote = randomQuote.textContent;
// randomQuote.textContent = savedQuote;
//fetch API for random quote
function getQuote() {
  const options = {
    method: "GET",
    headers: {
      // API key for the quotes
      "X-RapidAPI-Key": "754b4e35d4msh554b1fa15fcc530p1b2c10jsncbfab6b043ef",
      "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
    },
  };

  // Retrtieve and display the quotes from the API
  fetch("https://quotes15.p.rapidapi.com/quotes/random/", options)
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      randomQuote.textContent = "'" + data.content + "'";
      localStorage.setItem("savedQuote", data.content);
    })
    .catch((err) => console.error(err));
}
