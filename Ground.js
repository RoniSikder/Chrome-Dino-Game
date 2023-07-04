import { getter, incrementer, setter } from "./Helper.js"

const ground = document.querySelectorAll("[data-ground]")
const speed = 0.05;

export function setupGround() {
    setter(ground[0], "--left", 0)
    setter(ground[1], "--left", 300)
}

export function updateGround(delta,speedLimit) {
    ground.forEach(data => {
        incrementer(data, "--left", delta * speedLimit * speed * -1)
        if (getter(data, "--left") <= -300) {
            incrementer(data, "--left", 600)
        }
    })
}