var simonSequence = [];
var mySequence = [];
var counter = 0;
var roundCounter = 0;
$colors = $('.section');
var isDown = false;

function gameSequence(){
console.log("hi")
  if (counter == 0){
    simonMove();

}

  if(counter == 1){
    function myMove(){
        listenForMove();
        mySequence.push(myMove);
        counter--;
        roundCounter++
      }
      }
}
      compareArrays();

function simonMove(){

  var newMove = $colors[Math.floor(Math.random() * 4) + 1];
  simonSequence.push(newMove);
  counter++;
  roundCounter++;
  for (var i=0; i < simonSequence.length; i++){
    setTimeout(1000);
    lightUp(simonSequence[i]);
  }
  listenForMove();
}
$('#startButton').click(gameSequence);

function compareArrays() {
for (var i = 0; i < simonSequence.length; i++){
  if (simonSequence[i].equals(mySequence[i])){
    gameSequence();
  } else {
    gameOver();
  }
}
}

function gameOver() {}




function listenForMove(){}

function lightUp(color){
  $colors.on("mousedown", function(){
    console.log('hi');
    $(this).css('filter', 'brightness(160%)');


  })

  $colors.on("mouseup", function() {
    console.log('bye');
    $(this).css('filter', 'brightness(100%)');

  });
}
