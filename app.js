console.log("yo")
var simonSequence = [];
var mySequence = [];
var counter = 0;
var roundCounter = 0;
var yellow = document.getElementById('yellow');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var red = document.getElementById('red');
var colors = document.getElementsByClassName('section');
var isDown = false;

function gameSequence(){

  if (counter == 0){
    function simonMove(){

      var newMove = colors[Math.floor(Math.random() * 4) + 1];
      simonSequence.push(newMove);
      counter++;
      roundCounter++;
      for (var i=0; i < simonSequence.length; i++){
        setTimout(1000);
        lightUp(simonSequence[i]);
      }
      listenForMove();
    }
}

  if(counter == 1){
    function myMove(){
        var newMove = colors[Math.floor(Math.random() * 4) + 1];
        mySequence.push(newMove);
        counter--;
        roundCounter++
      }
      }
}
      compareArrays();

$('#startButton').click(gameSequence());

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

function lightUpColor(color){}




$(colors).on("mousedown", function(){
      console.log('hi');      // When mouse goes down, set isDown to true
    })
            .on("mouseup", function() {
      console.log('bye');  // When mouse goes up, set isDown to false
    });




/*
1. 1 listenForMove: function for each color section to: change color with new class while isDown = true, play sound,
    push value 1-4 to array, increase round counter, call gameSequence()





1. determine lighter version of the same colors
2. store new color in a variable
3. event listener for each section mousedown
4. if event listener is triggered for a section, append color temporarily
5. log event to corresponding sequence array

-start button

-computer makes move
-push to computerSequence array

counter++

-player makes move
-push to mySequence array

counter--

compare moves

if moves are the same, computer moves again
if moves are different, game over

losing sound and square








/*function checkMove(){



document.getElementById('yellow').addEventListener("mouseup", function(){
  this.style.backgroundColor = 'black'
})




/*

-start button

-computer makes move
-push to computerSequence array

counter++

-player makes move
-push to mySequence array

counter--

compare moves

if moves are the same, computer moves again
if moves are different, game over

losing sound and square
