

function* fizzBuzzGenerator(max) {
  // Tu código acá:
  let i=1;
  if(!max){
    while(true){
      if(i%5===0 && i%3===0) {
        yield "Fizz Buzz";
        i++
      }
      else if(i%3===0) {
        yield "Fizz";
        i++
      }
      else if(i%5===0) {
        yield "Buzz";
        i++
      }
      else{ yield i
      i ++;
      }
    }
  }
  else{
    while(i<=max){
      if(i%3 === 0 && i%5 === 0) {
        yield "Fizz Buzz"
        i++
      }
      else if(i % 3 === 0) {
        yield "Fizz";
        i++
      }
      else if(i % 5 === 0) {
        yield "Buzz";
        i++
      }
      else {yield i
        i ++;
      }
    }
  }

}

module.exports = fizzBuzzGenerator;
