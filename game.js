var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;

$(".row .btn").click(function(){
    if(level!==0)
    {
        var userChosenColour=$(this).attr("id");
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});

$(document).keydown(function(event){
    if(level===0)
        nextSequence();
});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.round(3*Math.random());
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        if(cScreenWidth<=1120)
        {
            $("h1").text("Game Over!\nClick on RESTART to try again");
            $("#start-button").text("RESTART");
            $("#start-button").removeClass("hidden");
        }
        else
            $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
}

// For Mobile
var cScreenWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

if(cScreenWidth<=1120)
{
    $("#start-button").removeClass("hidden");
    $("h1").text("Press START to begin");
    $("#start-button").click(function(){
        if(level===0)
        {
            $("#start-button").addClass("hidden");
            nextSequence();
        }
    });
}
