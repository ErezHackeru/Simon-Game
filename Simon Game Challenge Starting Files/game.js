var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var gameStarted = false;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).animate({opacity:0.5}, 100).animate({opacity:1}, 100);

    playSound(randomChosenColour);
    $("#level-title").text("level " + level)
    level ++;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
        
    } else { // the user got the answer wrong
        $("#level-title").text( "Game Over, Press Any Key to Restart");
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
    console.log(userClickedPattern + " " + gamePattern + " " + currentLevel);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


$(document).keypress(function() {
    if (!gameStarted) {
        nextSequence();
        gameStarted = true;
    }    
});

$(document).ready(function() {
    var level = 0;
    $("#level-title").text("Press a key to start !")
})
