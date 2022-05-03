var fs = require('fs');
const request=require("request")

module.exports = {
    date: function(arg,done){
        done(Date());  
    },
    pwd:function(arg,done){
        done(process.cwd())
    },
    ls:function(arg,done){
        fs.readdir('.', function(err, files) {
            if (err) throw err;
            let strfiles="";
            files.forEach(function(files){
            strfiles=strfiles+files+"\n"
            
          });
          done(strfiles)
        })
    },
    echo:function(arg,done){
        done(arg.join(" "))
    },
    cat: function(arg,done){
        fs.readFile(arg[0],function(err,data){
            if(err) throw err;
            done(data);
        })
    },
    head: function(arg,done){
        fs.readFile(arg[0], "utf-8",function(err,data){
            if(err) throw err;
            const firstline= data.split("\n").slice(0,10).join("\n");
            done(firstline)
            
        })
    },
    tail: function(arg,done){
        fs.readFile(arg[0], "utf-8",function(err,data){
            if(err) throw err;
            const endlines= data.split("\n").slice(-10).join("\n");
            done(endlines)
            
        })
    },
    curl: function(arg,done){
        request(arg[0], function(err,response,body){
            if(err) throw err;
            done(body)
            
        })
    }
    
    
}