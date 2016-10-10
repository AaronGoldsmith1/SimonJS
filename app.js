var simonSequence = [];
var mySequence = [];
var counter = 0;
var roundCounter = 0;
$colors = $('.section');
var isDown = false;


function gameSequence(){
  console.log("hi")
  if (counter == 0){
    simonMove();}

  if(counter == 1){
    myMove();
      }
}
      compareArrays();

function simonMove(){

  var newMove = $colors[Math.floor(Math.random() * 4) + 1];
  simonSequence.push(newMove);
  counter++;
  roundCounter++;
  simonSequence.forEach(function(item){
    $(item).css('filter', 'brightness(160%)');
    setTimeout(function(){
      $(item).css('filter', 'brightness(100%)');
    },1000)
  })
  listenForMove();
}

function myMove(){
    listenForMove();
    mySequence.push(myMove);
    counter--;
    roundCounter++
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

function gameOver() {
  $('#yellow').css('filter', 'brightness(160%)');
  setTimeout(function(){
    $('#yellow').css('filter', 'brightness(100%)');
  },1400)
  simonSequence.length = 0;
  mySequence.length = 0;


}

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
