var simonSequence = [];
var mySequence = [];
var counter = 0;
var roundCounter = 0;
var isDown = false;
$colors = $('.section');


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

  var newMove = $colors[Math.floor(Math.random() * 4 + 0)];
  simonSequence.push(newMove);
  simonSequence.forEach(function(item){
    $(item).css('filter', 'brightness(160%)');
    setTimeout(function(){
      $(item).css('filter', 'brightness(100%)');
    },1000)
  })

  counter++;
  roundCounter++;
  gameSequence();


}

function myMove(){

  $colors.on("mousedown", function(){
    console.log('hi');
    $(this).css('filter', 'brightness(160%)');
    mySequence.push(this);
  })

  $colors.on("mouseup", function() {
    console.log('bye');
    $(this).css('filter', 'brightness(100%)');
  });
    counter--;
gameSequence();
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



//function lightUp(){

//}
