
const ramme_width = 900
const ramme_height = 500
const kurv_width = 200
const kurv_height = 195

let poeng1 = 0
let poeng2 = 0

let ball1 = {
    html: document.getElementById("ball1"),
    diameter: 100,
    x: 0,
    x_velocity: 5,
    y: 0,
    y_velocity: 8,
    y_gravity: -0.2,
}
let ball2 = {
    html: document.getElementById("ball2"),
    diameter: 100,
    x: 0,
    x_velocity: 6,
    y: 0,
    y_velocity: 11,
    y_gravity: -0.2,
}

const kurv_venstre = {
    x: 0,
    y: ramme_height - kurv_height
}

const kurv_hoyre = {
    x: ramme_width - kurv_width,
    y: ramme_height - kurv_height
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
    }
    if (ball.y > ramme_height - ball.diameter) {
        ball.y_velocity = -2
    }
}


function kollisjon(ball, kurv, ballNum) {
    if (ball.x + ball.diameter > kurv.x && ball.x < kurv.x + kurv_width && ball.y + ball.diameter > kurv.y && ball.y < kurv.y + kurv_height && ball.y < ramme_height - ball.diameter - 30 && ball.y_velocity > 0)  {
        ball.x_velocity = -ball.x_velocity
        ball.y_velocity = -ball.y_velocity
    }

    if (ball.y > ramme_height - ball.diameter - 30 && ball.x + ball.diameter > kurv.x -55 && ball.x < kurv.x + kurv_width-55 && ballNum === 1) {
        ball.y_gravity = -2
        poeng1 += 1
        //ball.y_velocity = -ball.y_velocity
        //&& ball.y > kurv.y + kurv_height
    }
    else if (ball.y > ramme_height - ball.diameter - 30 && ball.x + ball.diameter > kurv.x + 55 && ball.x < kurv.x + kurv_width +55 && ballNum === 2) {
        ball.y_gravity = -2
        poeng2 += 1 
    }
}

function kollisjon_mellom_ballene() {
    if (Math.abs(ball1.x - ball2.x) < ball1.diameter/2 && Math.abs(ball1.y - ball2.y) < ball1.diameter/2 && antalltegn > 100) {
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


document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.nav-toggle').addEventListener('click', function () {
        document.querySelector('.burger-meny ul').classList.toggle('active');
    });
});