import { setupGround, updateGround } from "./Ground.js";
import { setupDino, updateDino, getDinoRect , setDinoLose } from "./Dino.js";
import { setupCactus, updateCactus, getCactusRacts } from "./Cactus.js";

const world = document.querySelector('[data-world]');
const scoreEle = document.querySelector('[data-score]')
const hider = document.querySelector('[data-hide-screen]')
const gameover = document.querySelector("[data-game-over]")
const reset = document.querySelector("[data-reset]")

const aspr_height = 20
const aspr_width = 100

function getscale() {
    let scale;
    if (window.innerWidth / window.innerHeight < aspr_width / aspr_height) {
        scale = window.innerWidth / aspr_width;
    }
    else {
        scale = window.innerHeight / aspr_height;
    }

    world.style.width = `${scale * aspr_width}px`
    world.style.height = `${scale * aspr_height}px`
}

getscale()
window.addEventListener("resize", getscale)
document.addEventListener("keydown", handleStart, { once: true })


let cur_time
let speed
let increment = 0.00001
let score
function updater(time) {
    if (cur_time == null) {
        cur_time = time
        window.requestAnimationFrame(updater)
        return;
    }
    const delta = time - cur_time;
    updateGround(delta, speed)
    updateDino(delta, speed)
    updateCactus(delta, speed)
    updateSpeed(delta);
    updateScore(delta);
    if(checkLose()){
        return handelLose()
    }


    cur_time = time;
    window.requestAnimationFrame(updater)
}

function handelLose(){
    setDinoLose()
    gameover.classList.remove("hider")
    reset.classList.remove("hider")
    document.addEventListener("keydown",handleStart,{once:true})
}

function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRacts().some(rect => isCollisoin(rect, dinoRect))
}

function isCollisoin(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function updateSpeed(delta) {
    speed += delta * increment
}
function updateScore(delta) {
    score += delta * 0.01;
    scoreEle.textContent = Math.floor(score)
}
function handleStart() {
    cur_time = null
    speed = 1
    score = 0;
    hider.classList.add("hider")
    gameover.classList.add("hider")
    reset.classList.add("hider")
    setupGround()
    setupDino()
    setupCactus()
    window.requestAnimationFrame(updater)
}

