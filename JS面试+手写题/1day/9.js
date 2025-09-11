function light(color, ms) {
    console.log(color)
    return new Promise(resolve => setTimeout(resolve, ms))
}

function loop() {
    light('red', 1000)
        .then(() => light('green', 3000))
        .then(() => light('yellow', 2000))
        .then(() => loop())
}
loop()
