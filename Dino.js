import { getter, incrementer, setter } from "./Helper.js"

const dino = document.querySelector("[data-dino]")
const jumpSpeed = 0.589
const gravity = 0.002
const dinoFrameCount = 2
const frameTime = 100

let isJumping
let dinoframe 
let currFrameTime
let yvelocity
export function setupDino(){
    isJumping = false
    dinoframe = 0
    currFrameTime = 0
    yvelocity = 0
    setter(dino,"--bottom",0)
    document.removeEventListener("keydown",onJump)
    document.addEventListener("keydown",onJump)
}
export function updateDino(delta,speed){
    handelRun(delta,speed)
    handelJump(delta)
}

export function getDinoRect(){
    return dino.getBoundingClientRect()
}

export function setDinoLose(){
    dino.src = "Image Components/dino-lose.png"
}

function handelRun(delta,speed){
    if(isJumping){
        dino.src = `Image Components/dino-stationary.png`
        return
    }
    if(currFrameTime >= frameTime){
        dinoframe = (dinoframe + 1) % dinoFrameCount;
        dino.src = `Image Components/dino-run-${dinoframe}.png`
        currFrameTime -= frameTime
    }
    currFrameTime += delta * speed
}
function handelJump(delta){
    if(!isJumping) return;
    incrementer(dino,"--bottom", yvelocity*delta )
    if(getter(dino,"--bottom") <= 0){
        setter(dino,"--bottom",0)
        isJumping = false
    }
    yvelocity -= gravity * delta
}



function onJump(e){
    if(e.code !== "Space" || isJumping) return
    yvelocity = jumpSpeed
    isJumping = true
}