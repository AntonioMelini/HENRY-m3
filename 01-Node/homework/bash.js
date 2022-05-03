const commands = require('./commands/index.js');

const done=function(output){
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
}

//const cmd = 'pwd';

// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
  var args = data.toString().trim().split(" ");
  var cmd = args.shift(); // remueve la nueva línea
  if(commands[cmd] ) {
   commands[cmd](args,done);
  }
  else{
    process.stdout.write(`${cmd} not found`)
  }
 
});

