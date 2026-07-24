// =====================================
// ARCADE DEL AMOR ❤️
// PARTE 3A - BASE + FONDO ANIMADO
// =====================================


// ===============================
// ELEMENTOS PRINCIPALES
// ===============================

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const bossScreen = document.getElementById("bossScreen");
const endingScreen = document.getElementById("endingScreen");

const startBtn = document.getElementById("startBtn");

const stars = document.getElementById("stars");
const particles = document.getElementById("particles");


// ===============================
// FONDO - ESTRELLAS
// ===============================

function createStars(){

    for(let i = 0; i < 80; i++){

        const star = document.createElement("div");

        star.innerHTML = "✦";

        star.style.position = "absolute";

        star.style.left = Math.random()*100 + "%";

        star.style.top = Math.random()*100 + "%";

        star.style.fontSize =
        (8 + Math.random()*18) + "px";

        star.style.color = "#ffffff";

        star.style.opacity =
        0.3 + Math.random()*0.7;


        star.style.animation =
        `blink ${2 + Math.random()*4}s infinite`;

        stars.appendChild(star);

    }

}


// ===============================
// PARTICULAS AZULES
// ===============================

function createParticles(){

    for(let i = 0; i < 35; i++){

        const p = document.createElement("div");

        p.innerHTML = "✧";

        p.style.position="absolute";

        p.style.left=Math.random()*100+"%";

        p.style.top=Math.random()*100+"%";

        p.style.color="#8eefff";

        p.style.fontSize=
        (10+Math.random()*15)+"px";


        p.style.animation =
        `float ${5+Math.random()*8}s infinite`;

        particles.appendChild(p);

    }

}


// ===============================
// AGREGAR ANIMACIONES CSS
// ===============================

const animationStyle = document.createElement("style");

animationStyle.innerHTML = `


@keyframes blink{

0%,100%{

opacity:.2;

transform:scale(.8);

}


50%{

opacity:1;

transform:scale(1.3);

}

}



@keyframes float{

0%{

transform:translateY(0);

opacity:.3;

}


50%{

transform:translateY(-30px);

opacity:1;

}


100%{

transform:translateY(0);

opacity:.3;

}

}


`;

document.head.appendChild(animationStyle);


// ===============================
// INICIAR FONDO
// ===============================

createStars();

createParticles();


// =====================================
// PARTE 3B - SISTEMA DE JUEGO
// =====================================


// ===============================
// VARIABLES DEL JUEGO
// ===============================

let currentLevel = 0;

let score = 0;

let lives = 3;


// ===============================
// PREGUNTAS
// ===============================

const questions = [

{
text:"❤️ ¿Dónde fue nuestro primer beso?",

answers:[
"🍕 En una pizzería",
"🌳 En una plaza",
"☕ En un café",
"🏎️ En el Motorshow"
],

correct:3

},

{

text:"❤️ ¿Cuál fue nuestro primer viaje juntos?",

answers:[
"🏖️ Mar del Plata",
"⛰️ Bariloche",
"🍷 Mendoza",
"🚢 Colonia"
],

correct:2

},

{

text:"❤️ ¿Dónde me pediste que sea tu novia?",

answers:[
"🌅 En la playa",
"🌉 En un muelle cerca de la playa",
"🌳 En un parque",
"🍽️ En un restaurante"
],

correct:1

},

{

text:"❤️ ¿Qué constelación elegimos como nuestra?",

answers:[
"⭐ Cruz del Sur",
"🌌 Orión",
"✨ Casiopea",
"🌠 Escorpio"
],

correct:1

},

{

text:"❤️ ¿Dónde nos conocimos?",

answers:[
"🏫 Facultad",
"💼 Municipalidad de 3 de Febrero",
"🎉 Una fiesta",
"🏋️ Gimnasio"
],

correct:1

},

{

text:"❤️ ¿Qué viaje planeamos y terminó cancelándose?",

answers:[
"🌊 Mar del Plata",
"🍷 Mendoza",
"⛰️ Bariloche",
"🇺🇾 Montevideo"
],

correct:2

}

];


// ===============================
// ELEMENTOS
// ===============================

const questionText =
document.getElementById("question");


const answersBox =
document.getElementById("answers");


const levelText =
document.getElementById("levelText");


const scoreText =
document.getElementById("scoreText");


const livesText =
document.getElementById("lives");


const progressFill =
document.getElementById("progressFill");


// ===============================
// CARGAR NIVEL
// ===============================

function loadLevel(){


let data = questions[currentLevel];


questionText.textContent =
data.text;


levelText.textContent =
`Nivel ${currentLevel+1}/${questions.length}`;


scoreText.textContent =
`Puntos: ${score}`;


livesText.textContent =
"❤️".repeat(lives);


progressFill.style.width =
`${((currentLevel+1)/questions.length)*100}%`;



answersBox.innerHTML="";


data.answers.forEach((answer,index)=>{


const button =
document.createElement("button");


button.className="answer";


button.textContent=answer;


button.onclick=()=>checkAnswer(index,button);


answersBox.appendChild(button);



});


}


// ===============================
// COMPROBAR RESPUESTA
// ===============================

function checkAnswer(index,button){


const correct =
questions[currentLevel].correct;



const buttons =
document.querySelectorAll(".answer");


buttons.forEach(btn=>{

btn.disabled=true;

});



if(index===correct){


button.classList.add("correct");


score+=100;


setTimeout(()=>{


currentLevel++;


if(currentLevel < questions.length){

loadLevel();

}

else{


gameScreen.classList.remove("active");

bossScreen.classList.add("active");


}


},1000);



}



else{


button.classList.add("wrong");


lives--;


livesText.textContent =
"❤️".repeat(lives);



setTimeout(()=>{


if(lives<=0){


alert("GAME OVER ❤️");

location.reload();


}

else{


loadLevel();


}


},1200);



}



}


// ===============================
// CARGAR PRIMER NIVEL
// ===============================


// Reemplazamos el botón inicial

startBtn.addEventListener("click",()=>{


startScreen.classList.remove("active");

gameScreen.classList.add("active");


currentLevel=0;

score=0;

lives=3;


loadLevel();


});

// =====================================
// PARTE 3C - DRAGÓN FINAL
// =====================================


let dragonLife = 50;


const attackBtn =
document.getElementById("attackBtn");


const bossLifeFill =
document.getElementById("bossLifeFill");


const dragon =
document.getElementById("dragon");



// ATAQUE

attackBtn.addEventListener("click",()=>{


dragonLife-=5;



dragon.classList.add("hit");


setTimeout(()=>{

dragon.classList.remove("hit");

},200);



bossLifeFill.style.width =
(dragonLife*2)+"%";



if(dragonLife<=0){


defeatDragon();


}



});



// DERROTAR DRAGÓN

function defeatDragon(){


bossLifeFill.style.width="0%";


setTimeout(()=>{


bossScreen.classList.remove("active");


endingScreen.classList.add("active");


},1500);



}

// =====================================
// PARTE 3D - REGALO FINAL
// =====================================


const giftBtn =
document.getElementById("giftBtn");


const chest =
document.getElementById("chest");


const video =
document.getElementById("video");


const message =
document.getElementById("message");



// ABRIR REGALO

giftBtn.addEventListener("click",()=>{


chest.classList.add("openChest");


giftBtn.style.display="none";



setTimeout(()=>{


video.style.display="block";


video.play();



},900);



});




// MENSAJE AL FINAL DEL VIDEO


video.addEventListener("ended",()=>{

createLove();

const text = 
`
Gracias por cada momento juntos ❤️

Por cada risa,
cada viaje,
cada abrazo
y cada aventura.

Este pequeño juego termina...

pero nuestra historia recién empieza.

Te amo muchísimo ❤️
`;



message.style.display="block";


let i=0;


const typing =
setInterval(()=>{


message.innerHTML =
text.substring(0,i)
.replace(/\n/g,"<br>");

i++;



if(i>text.length){

clearInterval(typing);

}



},45);



});

function createLove(){

for(let i=0;i<30;i++){


const heart=document.createElement("div");


heart.innerHTML="❤️";


heart.style.position="fixed";

heart.style.left=Math.random()*100+"vw";

heart.style.bottom="-20px";


heart.style.fontSize=
(15+Math.random()*30)+"px";


heart.style.animation=
"floatLove 5s linear";


document.body.appendChild(heart);



setTimeout(()=>{

heart.remove();

},5000);


}

}