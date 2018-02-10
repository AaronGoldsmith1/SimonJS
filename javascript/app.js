var simonSequence = []; //array to store sequence of Simon's moves
var mySequence = []; //array to store the player sequence
var counter = 0; // determines if it's Simon's or player's move
var roundCounter = 0; // currnet game round
var isDown = false; // to determine when the mouse is pressed down
var playerTimer = false; //determines when timed period begins for a move
var winFlashes = 0; // display winning signal
var $colors = $('.section'); // each of the clored sections stored in an array
var difficulty = "easy"; // default difficulty setting

//setting length of Simon's moves for varying difficulty
var difficultyUnits = {
  easy: {
    simonsSpeed: 1000
  },
  hard: {
    simonsSpeed: 500
  }
}

//assigning distinct sounds to each colored section and storing as objects in colorObj
var colorObj = {};
$colors.each(function() {
  var $colorName = $(this).attr('id');
  colorObj[$colorName] = {
    element: $(this),
    sound: $('#' + colorName + 'Sound') //referencing sounds by unique ID's
  }
});

//initiate game with Simon's move
function gameSequence() {
  if (counter === 0) {
    setTimeout(simonMove, 300);
  } else {
    myMove();
  }
}

function simonMove() {
  var newMove = $colors[(Math.floor(Math.random() * 4))]; //picking random colored section
  simonSequence.push(newMove); //adding Simon's move to his sequence
  lightSimonsNextColor(0); //start's Simon's sequence from the begining
  counter++; //switch from Simon to player
  roundCounter++; //tracking the number of rounds in the game
  $('#roundDisplay').text(roundCounter); //display current round
}

function lightSimonsNextColor(index) {
  var $currentColor = $(simonSequence[index]);
  var colorName = getColorName($currentColor);
  lightUpButton(colorName, true); //light up colored section with sound

  setTimeout(function() {
    $currentColor.css('filter', 'brightness(100%)');
    var nextIndex = index + 1;

    if (nextIndex < simonSequence.length) { //checking if all of Simon's sequence has been played back
      setTimeout(function() {
        lightSimonsNextColor(nextIndex);
      }, difficultyUnits[difficulty].simonsSpeed / 2); //time in between each button press
    } else {
      beginPlayersTurn();
      startTimer();
    }
  }, difficultyUnits[difficulty].simonsSpeed); //turning off button based on difficutly

}

function beginPlayersTurn() {
  mySequence = [];
}

//player has 5 seconds to complete move
function startTimer() {
  clearInterval(playerTimer);
  var countDown = 6;
  playerTimer = setInterval(function() {
    countDown = countDown - 1;
    $("#timeToMove").text(countDown);
    if (countDown < 1) { // end the game when time runs out
      gameOver();
    }
  }, 1000)
}


function myMove() {
  $("#timeToMove").text("5");

  //countdown between moves, resets after move
  if (playerTimer) {
    clearInterval(playerTimer);
  }

  if (!compareLastButtonPress()) { //if player makes wrong move in sequence, end game
    gameOver();
    return; //stops comparing sequences
  }

  if (mySequence.length == simonSequence.length) { // Determine if the turn was completed or not
    var equality = compareArrays(mySequence, simonSequence)
    if (equality) {
      if (roundCounter == 6) { //number of rounds needed to win the game
        userWin();
      } else {
        setTimeout(simonMove, 1500);
      }
    } else {
      gameOver();
    }
  } else {
    startTimer(); //restart the timer for each move
  }
}

function compareLastButtonPress() { //comparing current move with one before it
  var index = mySequence.length - 1;
  var lastButton = getColorName(mySequence[index]);
  var simonsMoveAtIndex = getColorName(simonSequence[index]);

  return lastButton == simonsMoveAtIndex;
}

function compareArrays(arr1, arr2) { //checking if each of the moves are the same
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

//light up yellow section with unique sound to signify player loss
function gameOver() {
  lightUpButton("yellow", false);
  $('#razz')[0].play();
  setTimeout(function() {
    $('#yellow').css('filter', 'brightness(100%)');
  }, 1400);

  simonSequence.length = 0;
  mySequence.length = 0;
  window.clearInterval(playerTimer);
  $("#playerAlertLose").show(); //display losing text alert
}

//when player clicks section, light up with sound, add to sequence
function playerColorMousedown() {
  var colorName = getColorName(this);
  lightUpButton(colorName, true); //move to mouseUp? Add js .loop()?
  mySequence.push(this);
}

//turn off colored section
function playerColorMouseup() {
  $(this).css('filter', 'brightness(100%)');
  myMove(); // determine when it's simons move
}

//all colored section flash 4 times in a row to signify the user has won
function userWin() {
  winFlashes++;
  for (var i = 0; i < 4; i++) {
    $colors.each(function() {
      var color = $(this); //referencing all colored sections (only $color = $(this)) ($colors.each(color.each())
      var turnOnIn = 1000 * i;
      var turnOffIn = turnOnIn + 500;

      //0 : turn on 0, turn off in 500
      //1 : turn on in 1000, turn off in 1500
      //2 : turn on in 2000, turn off in 2500
      //3: turn on in 3000, turn off in 3500

      //turn on all colored sections
      setTimeout(function() {
        var colorName = getColorName(color);
        lightUpButton(colorName, false); //Do not play section's sound
      }, turnOnIn);

      //turn off all colored sections
      setTimeout(function() {
        color.css('filter', 'brightness(100%)');
      }, turnOffIn);

      window.clearInterval(playerTimer);
    });
  }
  $("#playerAlert").show();
}

//turn on colored section, check if sound will be played
function lightUpButton(colorName, playSound) {
  color = colorObj[colorName];
  color.element.css('filter', 'brightness(160%)');

  if (playSound) { // play color sound if true
    stopAllSounds(); //stops sound of previously played button before current sound
    color.sound[0].play() //play() method starts playing the current audio
  }
}

//get the name of individual colored section
function getColorName(element) {
  return $(element).attr('id');
}

$('#startButton').click(gameSequence); // Start game

//controls when colored section turns on and off with mouse
$colors.on("mousedown", playerColorMousedown);
$colors.on("mouseup", playerColorMouseup);

$('#resetButton').click(function() {
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
  if ($(this).is(":checked")) { //jQuery filter listens to toggle switch for difficulty setting
    difficulty = "hard";
  } else {
    difficulty = "easy";
  }
})

//rotate toy when clicking crazy mode button with question mark
$("#crazyMode").click(function() {
  $("#mainToy").toggleClass("rotate");
})

function stopAllSounds() { //make all sounds distinct
  $(".sound").each(function() {
    this.pause();
    this.currentTime = 0;
  });
}
