const vinylNav = document.querySelector(".vinyl-nav");
const vinyl = document.querySelector(".vinyl");

let linkArchAperture = 150;

//Get computed Height of vinylNavigation
const vinylNavComputedStyle = getComputedStyle(vinylNav);
const vinylNavRadius = parseFloat(vinylNavComputedStyle.height)/2;
//VINIL RADIUS IS IN PIXELS
console.log("vinylNavRadius: " + vinylNavRadius);

const nChildren = vinylNav.childElementCount;

//Calculate the x and y positions of the links in the vinyl
for(let i=0; i<nChildren; i++){
    let link = vinylNav.children[i];

    //Calculamos el ángulo 
    let alphaDeg = ((linkArchAperture / nChildren) * (i + 0.5)) + ((180 - linkArchAperture) / 2);
    let alphaRad = alphaDeg * (Math.PI/180);    //Pasamos a radianes
    let yi = Math.sin(alphaRad);        //Vemos las posiciones
    let xi = Math.cos(alphaRad);
    let newMarginX = (xi*50) + 50;      //Calculamos offset
    let newMarginY = (yi*50) + 50;
    
    //Nueva posicion
    link.style.left = 100-newMarginX + "%";
    link.style.top  = 100-newMarginY + "%";
    //Correjimos offset por el tamaño del box
    link.style.transform = "translate(-50%,-50%)";
    //Ponemos nuevo centro del transform
    link.style.transformOrigin = "top left";


    //Nuevo angulo (habiendo corregido el origen del transform)
    link.style.rotate = alphaDeg - 90 +"deg";

    // console.log("Link " + i + ": " + link.textContent);
    // console.log("Grados para este link: " + (linkArchAperture/nChildren * (i+1) + (180 - linkArchAperture)/2));
    // console.log("en rad: " + 150/nChildren * i * (2*Math.PI/360));
    // console.log("Alpha: " + alphaDeg);
    // console.log("Xi: " + xi);
    // console.log("New Margin: " + newMarginX);
    // console.log("------------------------")
}

function makeMainSpace(){
    const vinyl = document.querySelector(".vinyl");
    const bandNameHeader = document.querySelector(".band-name");

    vinyl.classList.add("unfocused");
    bandNameHeader.classList.add("unfocused");
}

let isMainSpaceMade = false;

function loadPage(event){
    const bandName = document.querySelector(".band-name.unfocused h1");
    const transitionBackground = document.querySelector(".band-name.unfocused");
    
    const linkClicked = event.target;    
    let url = linkClicked.getAttribute("dest");

    //Cargar en el div
    const injectedPage = document.querySelector("#injected-page");
    injectedPage.innerHTML = 
    `<iframe src="${url}" width="100%" height="100%" frameborder="0"></iframe>`;

    //If no space push vinyl etc aside
    if(!isMainSpaceMade){
        makeMainSpace();
        isMainSpaceMade = true;
        //Get rid of unfocused class
        injectedPage.classList.toggle("hidden");
    }
    //If already loaded a page, then trigger animations
    else{
        transitionBackground.style.zIndex = "7";                
        bandName.style.zIndex ="10";
        bandName.style.animation = "none";                      //Remove last animation
        bandName.offsetHeight;                                  //hacer un update al elemento para que recargue las animaciones que se le van a aplicar
        bandName.style.animation = "shadow-cover-up 0.4s, shadow-cover-up-back 2s 0.4s";
        transitionBackground.style.animation = "none";
        transitionBackground.offsetHeight;
        transitionBackground.style.animation = "shadow-cover-up-background 0.4s, shadow-cover-up-back-background 3s 0.4s";
    }
}

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', loadPage);
});


// Get rid of animation cause you managed to make it in CSS
// shadowAnimation();
// //Cool shadow-text effect
// function shadowAnimation(){
//     const bandNameTitle = document.querySelector(".background .band-name h1");
//     console.log("bandname: " + bandNameTitle);
//     const steps = 100;
//     const stepSize = 0.05;

//     console.log("Steps: "+ steps);
//     for(let i = 0; i<steps; i++){
//         setTimeout( () => {
//             bandNameTitle.style.textShadow = 
//                 `0 ${i*stepSize}vh 0 grey, 
//                 0 ${i*stepSize*2}vh 0 rgba(128, 128, 128, 0.8), 
//                 0 ${i*stepSize*4}vh 0 rgba(128, 128, 128, 0.6),
//                 0 ${i*stepSize*6}vh 0 rgba(128, 128, 128, 0.4),
//                 0 ${i*stepSize*8}vh 0 rgba(128, 128, 128, 0.2),
//                 0 ${i*stepSize*10}vh 0 rgba(128, 128, 128, 0.1)`;
//             console.log("Shadow Attribute:" + "\n" + bandNameTitle.getAttribute("text-shadow"));
//         }, "0.1ms");
//     };
// }