
const ramme_width = 900
const ramme_height = 500
const kurv_width = 200
const kurv_height = 195

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


function flytt(ball) {
    ball.y_velocity += ball.y_gravity
    ball.x += ball.x_velocity
    ball.y += ball.y_velocity
    ball.html.style.bottom = ball.y + "px"
    ball.html.style.left = ball.x + "px"

    if (ball.x > ramme_width-ball.diameter || ball.x < 0) {
        ball.x_velocity = -ball.x_velocity
    }
    if (ball.y <= 0) {
        //ball.y_velocity = -ball.y_velocity * 0.9 
        ball.y_velocity = 10
    }
    if (ball.y > ramme_height - ball.diameter) {
        ball.y_velocity = -2
    }
    //if (ball.x > ramme_width-ball.diameter-kurv_width & ball.y)... 
    
    //if (ball.x < kurv_width) {
        //ball.x_velocity = -ball.x_velocity
    //}

}

function tegn() {
    flytt(ball1)
    flytt(ball2)
    //requestAnimationFrame(tegn)
}

//tegn()

setInterval(tegn, 20)

function spark1() {
    ball1.y_velocity = 8
}
function spark2() {
    ball2.y_velocity = 8
}



addEventListener("keypress", tastetrykk)

function tastetrykk(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        spark2()
    }
    if (event.key === "Tab") {
        event.preventDefault();
        spark1()
    }
}