const countDown = document.getElementById("countdown")
const result = document.getElementById("result")
const inputField = document.getElementById("userInput")
const restart = document.getElementById("restart")

resetea()

restart.addEventListener("click", () => {
    inputField.disabled = false;
    resetea()
})

inputField.addEventListener("blur", () => {
    inputField.disabled = true;
})

inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        inputField.disabled = true;
    }
})

function resetea () {
    countDown.innerHTML = ""
    result.innerHTML = ""
    inputField.value = ""
    const nombrePromesa1 = new Promise((resolve) => {
        let contador = 5
        countDown.innerHTML = `<p>CUENTA ATRÁS: ${contador} segundos</p>`
        const randomNumber = Math.floor(Math.random() * 3) + 1
        let intervalID = setInterval(() => {
            contador--
            countDown.innerHTML = `<p>CUENTA ATRÁS: ${contador} segundos</p>`
            if (contador == 0) {
                clearInterval(intervalID)
                inputField.disabled = true;
                resolve([randomNumber, inputField.value])
            }
        }, 1000)
    })
    const perdido = '<p class="red">La bomba ha estallado</p><img src="./img/earth-exploding-explosion.gif" />'
    nombrePromesa1.then(([randomNumber, valorUsuario]) => {
        if (!valorUsuario) {
            result.innerHTML = `${perdido}<p>No has seleccionado ningún número y la bomba se desactivaba con el número ${randomNumber}</p>`
        } else if (valorUsuario == randomNumber){
            result.innerHTML = `<p class="green">¡Enhorabuena!¡Has salvado el mundo!</p><img src="./img/star-wars-happy.gif" /><p>Has escogido el número ${inputField.value} y la bomba se desactivaba con el número ${randomNumber}</p>`
        } else if (valorUsuario < 1 || valorUsuario > 3) {
            result.innerHTML = `${perdido}<p>No has seleccionado ningún número en el rango y la bomba se desactivaba con el número ${randomNumber}</p>`
        } else {
            result.innerHTML = `${perdido}<p>Has escogido el número ${inputField.value} y la bomba se desactivaba con el número ${randomNumber}</p>`
        }
    })
}




       
       