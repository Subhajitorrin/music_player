document.addEventListener("DOMContentLoaded", function () {
    // Your JavaScript code here
    let menu = document.querySelector(".menu");
    menu.addEventListener("click", function () {
      let left = document.querySelector(".left");
      left.classList.toggle("active");
    });
  
    let x = document.querySelector(".x");
    x.addEventListener("click", function () {
      let left = document.querySelector(".left");
      left.classList.toggle("active");
    });
  });
  