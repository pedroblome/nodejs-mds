const express = require("express");

const server = express();

// Query params =?nome=NodeJS
// Route Params = /curso/2
// Request Body = {nome: 'NodeJS', tipo:'BackEnd'}

const curso = ['NOde js', 'javascript', 'reactnative', 'reactnative', 'react  native', 'react  native', 'react  native', 'react  native']

server.get('/curso/:index', (req, res) =>{
    const {index} = req.params;
    
    return res.json(curso[index]);
})

server.listen(3000);
