const navLinks = document.querySelector(".nav-links");
const menuIcon = document.querySelector(".menu-icon");

menuIcon.addEventListener("click", () =>{
    menuIcon.classList.toggle("active");
    navLinks.classList.toggle("active");    
})