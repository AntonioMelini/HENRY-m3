var id=0;
const {posts}=require("../server")


function posteos(req,res){
    const {author,title,contents}=req.body;
    if(!author || !title || !contents) res.status(422).json({ error: "No se recibieron los parámetros necesarios para crear el Post"});
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

}
module.exports={
    posteos
}