// const bodyParser = require("body-parser");
const { response } = require("express");
const express = require("express");
const posteo=require("./Post/router")
var id=0;

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
 server.use(express.json());

// TODO: your code to handle requests
server.post("/posts", (req,res)=>{
    const {author,title,contents}=req.body;
    if(!author || !title || !contents) return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post"});
    else{
        let obj={
            author,
            title,
            contents,
            id
        }
        id++;
        posts.push(obj);
        res.status(200).json(obj)
    }

})
server.post('/posts/author/:author',(req,res)=>{
    const {title,contents}=req.body;
    const {author}=req.params;
    if(!author || !title || !contents) return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post"});
    else{
        let obj={
            author,
            title,
            contents,
            id
        }
        id++;
        posts.push(obj);
        res.status(200).json(obj)
    }

})
server.get('/posts',(req,res)=>{
    const {term}=req.query;
    if(term){
        let result=posts.filter(p=> p.title.includes(term) || p.contents.includes(term))

        res.status(200).json(result);
    }else{
        res.status(200).json(posts);
    }
})
server.get('/posts/:author',(req,res)=>{
    const {author}=req.params;
    if(author){
        let result= posts.filter(p=>p.author.includes(author))
        if(result.length>0) return res.status(200).json(result)
    }
    return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
})
server.get('/posts/:author/:title',(req,res)=>{
    const {author,title}=req.params;
    if(author && title){
        let resultado= posts.filter(p=>p.author.includes(author) && p.title.includes(title))
        if(resultado.length>0) return res.status(200).json(resultado);
    }
    return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"});
})



server.put('/posts',(req,res)=>{
   const{id,title,contents}=req.body;
    if(!id || !title || !contents) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    let idvalido = posts.find(p=>p.id===id)
    if(idvalido){ 
        idvalido.title=title;
        idvalido.contents=contents;
        res.status(200).json(idvalido);
    }
    else{
        return res.status(STATUS_USER_ERROR).json({error: "El id recibido no es valido"})
    }


})

server.delete('/posts',(req,res)=>{
    const {id}=req.body;
   
    if(!id) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para eliminar el Post"})
   
    let idvalido= posts.find(p=>p.id===id)
   
    if(!idvalido){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para eliminar el Post"})
    }
    else{
        posts.forEach((p,index)=>{
            if(p.id===id){
                posts.splice(index,1);
            }
        })
        res.status(200).json({ success: true })
    }
})

server.delete('/author',(req,res)=>{
    const {author}=req.body;
    if(!author) return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para eliminar el Author"})
    let authorvalido= posts.filter(p=>p.author.includes(author));
    if(authorvalido.length===0){
        return res.status(STATUS_USER_ERROR).json({"error": "No existe el autor indicado"})
        
    }else{
        posts.forEach((p,index)=>{
            if(p.author===author){
                posts.splice(index,1);
            }
        })
        res.status(200).json(authorvalido)
    }

})



module.exports = { posts, server };

