var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    //kconsole.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }   
});




function nextSequence(){
    userClickedPattern=[];
    randomNumber = Math.floor(Math.random()*4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    $("#level-title").text("Level " + level);
    level++;

}

function playSound(name){
    var x = new Audio("sounds/"+name+".mp3");
    x.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(time1,100);
    function time1(){
        $("#"+currentColor).removeClass("pressed");
    }
}

function checkAnswer(currentLevel){

    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");

        if (gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else {
        console.log("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");},200);
        $("h1").text("Game Over, Press Any Key to Restart"); 
        statOver();  
    }
}

function statOver(){
    level=0;
    gamePattern=[];
    started=false;
}


