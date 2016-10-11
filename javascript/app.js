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

  var newMove = $colors[(Math.floor(Math.random() * 4))];
  simonSequence.push(newMove);
  // console.log("simon:", simonSequence);
  lightSimonsNextColor(0);
  counter++;
  roundCounter++;
}

function lightSimonsNextColor(index){
  // var index = 0;
  var $currentColor = $(simonSequence[index]);
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
      startTimer();
    }

  }, 1000);

}

function beginPlayersTurn(){
	console.log("Begin Players Turn");
	mySequence = [];
}

function startTimer(){
  playerTimer = setTimeout(function(){
    alert("out of time!")
  },3000)
}


function myMove(){
	console.log("Checking Players Turn");
  // console.log("player: ", mySequence)
	if(playerTimer){
		clearTimeout(playerTimer);
	}
  // Determine if the turn was completed or not
  if(mySequence.length == simonSequence.length){
    //Yay, we've kept up. Keep going
    var equality = compareArrays(mySequence, simonSequence)
    console.log(equality)
    if (equality){
      console.log("Moving to Simons Turn");
      simonMove();
    } else {
      console.log('running game over')
      gameOver();
      // location.reload();
    }
  } else {
    startTimer();
  }

}

//only comparing first element
function compareArrays(arr1, arr2) {
  for(var i = 0; i < arr1.length; i++){
    if(arr1[i] !== arr2[i]){  //double for loop
      return false;
    }
  }
  return true;
}

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


//simon plays
//create timeout(give player3sec to click)
//player clicks
//clear timeout
//highlight what simon did
//check move?
//simon play OR create timeout


//dont play moves too quickly

//TO-DO;
//RESET BUTTON - no location reload
//WINNING or ROUND COUNTER WITH DISPLAY
