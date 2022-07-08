const express = require("express");

const server = express();

// Query params =?nome=NodeJS
// Route Params = /curso/2
// Request Body = {nome: 'NodeJS', tipo:'BackEnd'}


server.get('/curso/:id', (req, res) =>{
    const id = req.params.id;
    
    return res.json({curso: `Id do curso é ${id}`})
})

server.listen(3000);
