const socket = io();

let user;

const chatBox = document.getElementById("chatBox");

Swal.fire({
    title: "Identificate",
    input: "text",
    text: "Ingrese un usuario para identificarse en el chat",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un nombre para continuar"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    console.log(user);
})


chatBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
    
            socket.emit("message", { user: user, message: chatBox.value });
            chatBox.value = "";
        }
    }
})

socket.on("message", (data) => {
    let log = document.getElementById("messagesLogs");
    let mensajes = "";

    data.forEach(mensaje => {
        mensajes = mensajes + `${mensaje.user} dice: ${mensaje.message} <br>`;
    })
    log.innerHTML = mensajes;
})
