var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req,res)=>{
    if(req.url==="/arcoiris"){
        const pic=fs.readFileSync(__dirname+"/images/arcoiris_doge.jpg")
        res.writeHead(200, {"Content-Type": "image/jpg"})
        res.end(pic)
    }else  if(req.url==="/badboy"){
        const pic=fs.readFileSync(__dirname+"/images/badboy_doge.jpg")
        res.writeHead(200, {"Content-Type": "image/jpg"})
        res.end(pic)
    }else if(req.url==="/code"){
        const pic=fs.readFileSync(__dirname+"/images/code_doge.jpg")
        res.writeHead(200, {"Content-Type": "image/jpg"})
        res.end(pic)
    }else if(req.url==="/resaca"){
        const pic=fs.readFileSync(__dirname+"/images/resaca_doge.jpg")
        res.writeHead(200, {"Content-Type": "image/jpg"})
        res.end(pic)
    }else if(req.url==="/retrato"){
        const pic=fs.readFileSync(__dirname+"/images/retrato_doge.jpg")
        res.writeHead(200, {"Content-Type": "image/jpg"})
        res.end(pic)
    }else if(req.url==="/sexy"){
        const pic=fs.readFileSync(__dirname+"/images/sexy_doge.jpg")
        res.writeHead(200, {"Content-Type": "image/jpg"})
        res.end(pic)
    }else{
        res.writeHead(404, {"Content-Type": "text/plain"})
        res.end("404 NOT FOUND")
    }
}).listen(3001,()=>console.log("se levanto perro"))
