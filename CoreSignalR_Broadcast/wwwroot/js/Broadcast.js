
//Instancia de hubconnectionbuilder e indicarle el end point (/broadcasthub). Para el login le metemos el information
//para que nos de informacion del login
const connection = new signalR.HubConnectionBuilder().withUrl("/broadcastHub").configureLogging(signalR.LogLevel.Information).build();

//iniciar la conexion y si nos daria algun error con el console error nos lo pinta en la consola

connection.start().catch(function (err) {
    return console.error(err.toString());
});

// Invocado desde el hub .Primer parametro el nombre del metodo desde el cliente ("displaytext"). Este nombre es igual
// tanto en el cliente(donde nos encontramos) como en el servidor o parte hub.
// Segudamente con la function message imprimimos el mensaje que nos llega desde el hub ayudandonos de un li

connection.on("displayText", function (message) {
    var li = document.createElement("li");
    li.textContent = message;
    li.className = "list-group-item";
    document.getElementById("messages").appendChild(li);
});

// Invocar al metodo hub desde nuestro cliente. El button se llamara broadcast y el control tipo texto msg

document.getElementById("broadcast").addEventListener("click", function (event) {
    var message = document.getElementById("msg").value;
    // Invoke. Invoca metodos del servidor o hub y le enviamos el parametro
    connection.invoke("BroadcastMessage", message).catch(function (err) {
        return console.error(err.toString());
    });
    document.getElementById("msg").value = "";
    event.preventDefault();
});