var simonSequence = [];
var mySequence = [];
var counter = 0;
var roundCounter = 0;
var isDown = false;
var playerTimer = false;
var winFlashes = 0;
$colors = $('.section');
//$sounds = $('.sound');

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
    simonMove();
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
  },5000)

}


function myMove(){
	console.log("Checking Players Turn");

	if(playerTimer){
		clearTimeout(playerTimer);
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
        simonMove();
      }
    } else {
      console.log('running game over')
      gameOver();

    }
  } else {
    startTimer();
  }

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
  lightUpButton("yellow", true);
  $('#razz')[0].play();
  setTimeout(function(){
    $('#yellow').css('filter', 'brightness(100%)');

  },1400)

  simonSequence.length = 0;
  mySequence.length = 0;
  window.clearTimeout(playerTimer);
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
  $('#mainToy').removeClass("rotate");
  window.clearTimeout(playerTimer);

})

 function userWin() {
   winFlashes++;
  $colors.each(function(){
    var colorName = getColorName(this);
    lightUpButton(colorName, true);
    setTimeout(function(){
      $(this).css('filter', 'brightness(100%)');

      if(winFlashes < 4){
        setTimeout(function(){
          userWin();
        }, 500)
      }else{
        winFlashes = 0;
      }
    },1400)

    window.clearTimeout(playerTimer);
  });
 }

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
        lightUpButton(colorName, false); //Do not play button's sound, play a winning sound (TODO)
      }, turnOnIn);

      //turn off
      setTimeout(function(){
        color.css('filter', 'brightness(100%)');
      }, turnOffIn);

      window.clearTimeout(playerTimer);
    });
  }
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
