var simonSequence = [];
var mySequence = [];
var counter = 0;
var roundCounter = 0;
var isDown = false;
var playerTimer = false;
$colors = $('.section');

function gameSequence(){
  console.log("hi");
  if (counter === 0){
    simonMove();
  }else{
    myMove();
  }
}

//compareArrays();

function simonMove(){

  var newMove = $colors.eq(Math.floor(Math.random() * 4));
  simonSequence.push(newMove);

  lightSimonsNextColor(0);

  counter++;
  roundCounter++;
}

function lightSimonsNextColor(index){
  var $currentColor = simonSequence[index];
  $currentColor.css('filter', 'brightness(160%)');
  console.log($currentColor.attr('id'));

  setTimeout(function(){
    $currentColor.css('filter', 'brightness(100%)');
    var nextIndex = index + 1;

    if(nextIndex < simonSequence.length){
    	setTimeout(function () {
      	lightSimonsNextColor(nextIndex);
    	}, 500);
    }else{
    	beginPlayersTurn();
    }

  }, 1000);

}

function beginPlayersTurn(){
	console.log("Begin Players Turn");
	mySequence = [];
}

function myMove(){
	console.log("Checking Players Turn");
	if(playerTimer){
		clearTimeout(playerTimer);
	}

  playerTimer = setTimeout(function(){

    // This timer runs at the end of our turn.
    // Determine if the turn was completed or not
   if(mySequence.length == simonSequence.length){
      //Yay, we've kept up. Keep going
      clearTimeout(playerTimer);
   //   debugger;
   		console.log("Moving to Simons Turn");
      simonMove();
    }else{
      alert("You Lose.");
      gameOver();
      location.reload();
    }
  }, 3000);
}

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

/*for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false; */

function gameOver() {
  $('#yellow').css('filter', 'brightness(160%)');
  setTimeout(function(){
    $('#yellow').css('filter', 'brightness(100%)');

  },1400)

  simonSequence.length = 0;
  mySequence.length = 0;


}

function playerColorMousedown(){
  $(this).css('filter', 'brightness(160%)');
  mySequence.push(this);
}

function playerColorMouseup(){
   $(this).css('filter', 'brightness(100%)');
   myMove(); // determine when it's simons move
}

$('#startButton').click(gameSequence); // Start game

 $colors.on("mousedown", playerColorMousedown);
 $colors.on("mouseup", playerColorMouseup);
