const express = require("express");

//used to
// server.use(express.json());

const server = express();

server.use(express.json());

const cursos = ["NOde js", "javascript", "reactnative"];

//middleware global

server.use((req,res, next ) =>{
  console.log(`url chamada ${req.url}`)
  return next();

})  

function checkCurso(req,res,next){
  if(!req.body.name){
    return res.status(400).json({ error: "Nome do curso e obrigatorio!!"})
  }
  return next();
}

function checkIndexCurso(req,res,next){
  const curso = req.params.index
  const atualLengt = cursos.length
  if(curso<0 || curso>(atualLengt-1) ){
    return res.status(400).json({error: "index do curso nao existe, revise por favor!!"})
  }
  return next();
}

server.get("/cursos", checkIndexCurso, (req, res) => {
  return res.json(cursos);
});

server.get("/cursos/:index",checkIndexCurso, (req, res) => {
  const { index } = req.params;

  return res.json(cursos[index]);
});

server.post("/cursos", checkCurso, (req, res) => {
  // the line above say that the property that will be sended is a body json
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

server.put("/cursos/:index", checkCurso,checkIndexCurso, (req,res) =>{
  const {index} =  req.params;
  const {name} = req.body;

  cursos[index] = name;

  return res.json(cursos);

   
})

server.delete("/cursos/:index",checkIndexCurso, (req,res) =>{
  const {index} =  req.params;

  cursos.splice(index, 1)

  return res.json(cursos)

})

server.listen(3000);
