var simonSequence = [];
var mySequence = [];
var counter = 0;
var roundCounter = 0;
var isDown = false;
var playerTimer = false;
var winFlashes = 0;
$colors = $('.section');
//$sounds = $('.sound');

var difficulty = "easy";

var difficultyUnits = {
  easy: {
    simonsSpeed: 1000
  },
  hard: {
    simonsSpeed: 500
  }
}

$("#crazyMode").click(function(){
  $("#mainToy").toggleClass("rotate");
})

var colorObj = {};

$colors.each(function(){
  var colorName = $(this).attr('id');
  colorObj[colorName] = {
    element: $(this),
    sound: $('#' + colorName + 'Sound')
  }

});

function gameSequence(){
  console.log("hi");
  if (counter === 0){
    setTimeout(simonMove, 300);
  }else{
    myMove();
  }
}

function simonMove(){

  var newMove = $colors[(Math.floor(Math.random() * 4))];
  simonSequence.push(newMove);
  lightSimonsNextColor(0);
  counter++;
  roundCounter++;
  $('#roundDisplay').text(roundCounter);
}

function lightSimonsNextColor(index){

  var $currentColor = $(simonSequence[index]);
  var colorName = getColorName($currentColor);
  lightUpButton(colorName, true);
  console.log($currentColor.attr('id'));

  setTimeout(function(){
    $currentColor.css('filter', 'brightness(100%)');
    var nextIndex = index + 1;

    if(nextIndex < simonSequence.length){
      setTimeout(function () {
        lightSimonsNextColor(nextIndex);
      }, difficultyUnits[difficulty].simonsSpeed / 2);
    }else{
      beginPlayersTurn();
      startTimer();
    }

  }, difficultyUnits[difficulty].simonsSpeed);

}

function beginPlayersTurn(){
	console.log("Begin Players Turn");
	mySequence = [];
}

function startTimer(){
  var countDown = 6;
  playerTimer = setInterval(function(){
    countDown = countDown - 1;
    $("#timeToMove").text(countDown);
    if (countDown == 0) {
        gameOver();
    }
  },1000)

}


function myMove(){
	console.log("Checking Players Turn");

	if(playerTimer){
		clearInterval(playerTimer);
	}

	if(!compareLastButtonPress()){
	  gameOver();
	  return;
	}

  // Determine if the turn was completed or not
  if(mySequence.length == simonSequence.length){
    var equality = compareArrays(mySequence, simonSequence)
    console.log(equality)
    if (equality){
      if (roundCounter == 3){
        alert("you win!");
        userWin();
      }else{
        console.log("Moving to Simons Turn");

        setTimeout(simonMove, 500); //need to set timout?
      }
    } else {
      console.log('running game over')
      gameOver();

    }
  } else {
    startTimer();
  }

}

function compareLastButtonPress(){
  var index = mySequence.length - 1;
  var lastButton = getColorName(mySequence[index]);
  var simonsMoveAtIndex = getColorName(simonSequence[index]);

  return lastButton == simonsMoveAtIndex;
}

function compareArrays(arr1, arr2) {
  for(var i = 0; i < arr1.length; i++){
    if(arr1[i] !== arr2[i]){
      return false;
    }
  }
  return true;
}

function gameOver() {
  lightUpButton("yellow", false);
  $('#razz')[0].play();
  setTimeout(function(){
    $('#yellow').css('filter', 'brightness(100%)');

  },1400);

  simonSequence.length = 0;
  mySequence.length = 0;
  window.clearInterval(playerTimer);
  $("#playerAlertLose").show();
}

function playerColorMousedown(){
  var colorName = getColorName(this);
  lightUpButton(colorName, true);
  //$(this).css('filter', 'brightness(160%)');
  mySequence.push(this);
}

function playerColorMouseup(){
   $(this).css('filter', 'brightness(100%)');
   myMove(); // determine when it's simons move
}

$('#startButton').click(gameSequence); // Start game

 $colors.on("mousedown", playerColorMousedown);
 $colors.on("mouseup", playerColorMouseup);

$('#resetButton').click(function(){
  simonSequence.length = 0;
  mySequence.length = 0;
  roundCounter = 0;
  $('#roundDisplay').text(0);
  $("#timeToMove").text("5");
  $('#mainToy').removeClass("rotate");
  $(".winLoseMessage").hide();
  window.clearInterval(playerTimer);
})

$("#difficultyToggle").change(function() {
  if ($(this).is(":checked")){   //jQuery filter
    difficulty = "hard";
  } else {
    difficulty = "easy";
  }
})



 function userWin() {
   winFlashes++;

  for(var i = 0; i < 4; i++){
    $colors.each(function(){
      var color = $(this);
      var turnOnIn = 1000 * i;
      var turnOffIn = turnOnIn + 500;

      //0 : turn on 0, turn off in 500
      //1 : turn on in 1000, turn off in 1500
      //2 : turn on in 2000, turn off in 2500
      //3: turn on in 3000, turn off in 3500

      //turn on
      setTimeout(function(){
        var colorName = getColorName(color);
        lightUpButton(colorName, false); //Do not play button's sound
      }, turnOnIn);

      //turn off
      setTimeout(function(){
        color.css('filter', 'brightness(100%)');
      }, turnOffIn);

      window.clearInterval(playerTimer);
    });
  }
  $("#playerAlert").show();
 }

 function lightUpButton(colorName, playSound){
   color = colorObj[colorName];

   color.element.css('filter', 'brightness(160%)');

   if(playSound){

     console.log(colorName + "'s Sound");
    color.sound[0].play()
   }
 }

 function getColorName(element){
   return $(element).attr('id');
 }






 //keyboard controls
 //keycodes;
 //


//global -> player click = 0 inside simonMove so always comparing first element
// if mysequence[playerclick] === ss[pc]
//lightUpButton
//{else}gameover
//playerclick++


//todo
//Display timer countdown inside main toy next to counter
//Text display winner or looser
//Set difficulty with move intervals, speeds up progressively in each sequence, change user timer
//finish readme
