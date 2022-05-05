var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer((req,res)=>{
  if(req.url==="/api"){
    res.writeHead(200,{"Content-Type": "application/json"})
    res.end(JSON.stringify(beatles))
  }
  else if(req.url.startsWith("/api/")){
    
      const nombre=req.url.split("/api/")[1].replace("%20"," ");
      for (var i = 0; i < beatles.length; i++) {
        if(nombre.toLocaleLowerCase() === beatles[i].name.toLocaleLowerCase()){
          
          res.writeHead(200,{"Content-Type": "application/json"});
          res.end(JSON.stringify(beatles[i]));
          console.log(beatles[i].name);
          se_encontro=true;
          break;
          
        }
      }
      if(i===beatles.length){
        res.writeHead(404,{"Content-Type": "text/plain"});
        res.end("404 not found");
      }
  }else if(req.url==="/"){
    res.writeHead(200, {"Content-Type": "text/html"})
    const dochtml=fs.readFileSync(__dirname+"/index.html")
    res.end(dochtml)

  }else if(req.url.startsWith("/")){
    const Beatlename=req.url.split("/")[1].replace("%20"," ");
    const foundbeatle = beatles.find((beatle)=>beatle.name.toLocaleLowerCase() === Beatlename.toLocaleLowerCase())
    if(!foundbeatle){
      res.writeHead(404,{"Content-Type": "text/plain"})
      res.end("404 not found")
    }else{
      
      var html=fs.readFileSync(__dirname+"/index.html","utf-8")
      html=html.replace("[nombreBeatle]",foundbeatle.name)
        .replace("[fechaNacimiento]",foundbeatle.birthdate)
        .replace("[url]",foundbeatle.profilePic) 
      
      res.writeHead(200, {"Content-Type": "text/html"})
      res.end(html)
    }
  }else{
    res.writeHead(404,{"Content-Type": "text/plain"})
    res.end("404 not found")
  }
}).listen(3001,()=>{
  console.log("todo ookey perro")
})