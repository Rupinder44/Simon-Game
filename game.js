var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=0;

$(".btn").click(function(event){
    var userChosenColor=this.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function nextSequence(){
    level=1+level;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    userClickedPattern=[];
}
function playSound(color){
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("."+currentColor).addClass("pressed");
    setTimeout(() => {
        $("."+currentColor).removeClass("pressed");
    }, 50);
}

$(document).keypress(function(){
    if(started==0){
    $("h1").text("Level "+level);
    nextSequence();
    started=1;}
})

function checkAnswer(currentLevel){
    console.log(currentLevel);
    console.log(gamePattern[currentLevel]);
    console.log(userClickedPattern[currentLevel]);
if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("Success");
    if(gamePattern.length==userClickedPattern.length){
    setTimeout(() => {
        nextSequence();
    }, 1000);}
}
else{
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}
}