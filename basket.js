const ramme_width = 900
const ramme_height = 500
const kurv_width = 200
const kurv_height = 155 //195

const poeng1_output = document.getElementById("poeng1")
const poeng2_output = document.getElementById("poeng2")

const vinnertekst = document.getElementById("vinnertekst")

let poeng1 = 0
let poeng2 = 0
let spiller = 0

const ramme = document.getElementById("ramme")

let ball1 = {
    html: document.getElementById("ball1"),
    diameter: 100,
    x: 0,
    x_velocity: 6,
    y: 0,
    y_velocity: 7,
    y_gravity: -0.2,
    harTruffetKurv: false,
}
let ball2 = {
    html: document.getElementById("ball2"),
    diameter: 100,
    x: 0,
    x_velocity: 4,
    y: 0,
    y_velocity: 9,
    y_gravity: -0.2,
    harTruffetKurv: false,
}

const kurv_venstre = {
    x: 0,
    y: ramme_height - kurv_height
}

const kurv_hoyre = {
    x: ramme_width - kurv_width,
    y: ramme_height - kurv_height
}

function startSpill() {
    let overlay = document.getElementById("overlay")
    overlay.style.display = "none"
}


function sjekkPoengsum() {
    if (poeng1 === 10) {
       spiller = 1
        vinner()
    }
    if (poeng2 === 10) {
        spiller = 2
        vinner()
    }
}

function vinner() {
    let overlay_end = document.getElementById("overlay_end")
    overlay_end.style.display = "flex"
    overlay_end.style.flexDirection = "column"
    vinnertekst.innerHTML = "Vinneren er spiller nr. " + spiller + "!"
}

function flytt(ball) {
    ball.y_velocity += ball.y_gravity
    ball.x += ball.x_velocity
    ball.y += ball.y_velocity
    ball.html.style.bottom = ball.y + "px"
    ball.html.style.left = ball.x + "px"

    if (ball.x > ramme_width - ball.diameter || ball.x < 0) {
        ball.x_velocity = -ball.x_velocity
    }
    if (ball.y <= 0) {
        ball.y_velocity = 10
        ball.y_gravity = -0.2
        ball.harTruffetKurv = false
    }
    if (ball.y > ramme_height - ball.diameter) {
        ball.y_velocity = -2
    }
}


function kollisjon(ball, kurv, ballNum) {
    if (ball.x + ball.diameter > kurv.x && ball.x < kurv.x + kurv_width && ball.y + ball.diameter > kurv.y && ball.y < kurv.y + kurv_height && ball.y < ramme_height - ball.diameter - 30 && ball.y_velocity > 0) {
        ball.x_velocity = -ball.x_velocity
        ball.y_velocity = -ball.y_velocity
    }
    let randomColor = Math.floor(Math.random() * 16777215).toString(16);

    if (ball.y > ramme_height - ball.diameter - 30 && ball.x + ball.diameter > kurv.x - 55 && ball.x < kurv.x + kurv_width - 55 && ballNum === 1 && !ball.harTruffetKurv) {
        ball.y_gravity = -2
        poeng1 += 1
        poeng1_output.innerHTML = "SCORE: " + poeng1
        ball.harTruffetKurv = true

        sjekkPoengsum()
        ramme.style.backgroundColor = "#" + randomColor
        //ball.y_velocity = -ball.y_velocity
        //&& ball.y > kurv.y + kurv_height
    }
    else if (ball.y > ramme_height - ball.diameter - 30 && ball.x + ball.diameter > kurv.x + 55 && ball.x < kurv.x + kurv_width + 55 && ballNum === 2 && !ball.harTruffetKurv) {
        ball.y_gravity = -2
        //if (ball.y_gravity === -2 && ball.y === 200) {
        poeng2 += 1
        poeng2_output.innerHTML = "SCORE: " + poeng2
        ball.harTruffetKurv = true

        sjekkPoengsum()
        ramme.style.backgroundColor = "#" + randomColor
        //}
        //poeng2 += 1 
        //poeng2_output.innerHTML = "Score ball 2: " + poeng2
    }
}

function kollisjon_mellom_ballene() {
    if (Math.abs(ball1.x - ball2.x) < ball1.diameter / 2 && Math.abs(ball1.y - ball2.y) < ball1.diameter / 2 && antalltegn > 100) {
        ball1.x_velocity = -ball1.x_velocity;
        ball2.x_velocity = -ball2.x_velocity;
        ball1.y_velocity = -ball1.y_velocity;
        ball2.y_velocity = -ball2.y_velocity;
    }
}

let antalltegn = 0

function tegn() {
    antalltegn += 1
    flytt(ball1)
    flytt(ball2)
    kollisjon(ball1, kurv_venstre, 1);
    kollisjon(ball2, kurv_hoyre, 2);
    kollisjon_mellom_ballene();
}

setInterval(tegn, 20)

function spark1() {
    ball1.y_velocity = 8
}
function spark2() {
    ball2.y_velocity = 8
}

//Tastatur
addEventListener("keypress", tastetrykk)

function tastetrykk(event) {
    console.log("Tastetrykk:", event.key);
    if (event.key === "a") {
        event.preventDefault();
        spark1()
        console.log()
    }
    if (event.key === "Enter") {
        event.preventDefault();
        spark2()
    }
}

//Nav
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.nav-toggle').addEventListener('click', function () {
        document.querySelector('.burger-meny ul').classList.toggle('active');
    });
});