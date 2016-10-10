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
    myMove();}
}

//compareArrays();

function simonMove(){

  var newMove = $colors.eq(Math.floor(Math.random() * 4));
  simonSequence.push(newMove);
  var i = 0;
  var lightUpSimon = setInterval(function() {
    simonSequence[i].css('filter', 'brightness(160%)');
    setTimeout(function(){
      simonSequence[i].css('filter', 'brightness(100%)');
    i++;
    if (i == simonSequence.length){
      clearInterval(lightUpSimon)
    }
      },750)


  }, 1000)


  /*simonSequence.forEach(function(item){
    $(item).css('filter', 'brightness(160%)').delay(500);
    setTimeout(function(){
      $(item).css('filter', 'brightness(100%)');
    },1000)
  })*/

  counter++;
  roundCounter++;



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
    simonMove();
  });
  counter--;

}

//check if user array is same length as simon

$('#startButton').click(gameSequence); // Start the game

//only comparing first element

function compareArrays() {
for (var i = 0; i < simonSequence.length; i++){
  if (simonSequence[i].equals(mySequence[i])){  //isEqual
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
