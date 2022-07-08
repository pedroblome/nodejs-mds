const express = require('express');

const server = express();


//localhost:3000/cursos 
server.get('/cursos', ()=> {
    console.log("acessou a rota")
})

//will listen the port 3000
server.listen(3000)
