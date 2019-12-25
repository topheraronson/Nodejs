const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message = document.querySelector("#message`")
// const message2 = document.querySelector("#message-2")

message.textContent = ""

weatherForm.addEventListener("submit", (e) => {
    
    e.preventDefault()

    const location = search.value

    fetch("/weather?address=" + location).then((response) => {
    
        response.json().then((data) => {
            if (data.error) {
                message.textContent = data.error
            } else {
                message.textContent = "The forecast for " + data.location + " is " + data.sumary
            }

        })
    })
})