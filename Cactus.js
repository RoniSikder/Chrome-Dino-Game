import { getter, incrementer, setter } from "./Helper.js"

const castusSpeed = 0.05
const minInterval = 900
const maxInterval = 1500
const world = document.querySelector("[data-world]")

let nextcactusTime
export function setupCactus(){
    nextcactusTime = minInterval
    document.querySelectorAll("[data-cactus]").forEach(cactus=>{
        cactus.remove();
    })
}

export function updateCactus(delta,speed){

    document.querySelectorAll("[data-cactus]").forEach(cactus=>{
        incrementer(cactus,"--left", delta * speed * castusSpeed * -1 )
        if(getter(cactus, "--left")<= -100){
            cactus.remove();
        }
    })
    if(nextcactusTime <= 0){
        createCactus()
        nextcactusTime = randomNumberBetween(minInterval,maxInterval)/speed
    }
    nextcactusTime -= delta
}

function randomCactus(){
    return Math.floor(Math.random()*4)
}

let cactusNumber

function createCactus(){
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true
    cactusNumber = randomCactus();
    cactus.src = `Image Components/cactus-${cactusNumber}.png`
    cactus.classList.add("cactus");
    world.append(cactus)
    setter(cactus,"--left",100)
}

function randomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

export function getCactusRacts(){
    return [...document.querySelectorAll("[data-cactus]")].map(cactus=>{
        return cactus.getBoundingClientRect()
    })
}