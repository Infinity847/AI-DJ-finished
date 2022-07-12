var song = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var InNumberleftWristY = null;
var remove_decimals;
var volume;
var scoreLeftWrist = null;
function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw()
{
     image(video,0,0,600,500);
fill("#FF0000");
stroke("#FF0000");
if (scoreLeftWrist > 0.2) {
circle(leftWristX,leftWristY,20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML = "Volume = " + volume;
song.setVolume(volume);

if (scoreRightWrist > 0.2 && scoreLeftWrist > 0.2) {
    circle(RightWristX,RightWristY,20);
    if(rightWristY >0 && rightWristY <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";		
        song.rate(0.5);
    }
        else if(rightWristY >100 && rightWristY <= 200)
    {
        document.getElementById("speed").innerHTML = "Speed = 1x";		
        song.rate(1);
    }
        else if(rightWristY >200 && rightWristY <= 300)
    {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";		
        song.rate(1.5);
    }
        else if(rightWristY >300 && rightWristY <= 400)
    {
        document.getElementById("speed").innerHTML = "Speed = 2x";		
        song.rate(2);
    }
        else if(rightWristY >400 && rightWristY <= 500)
    {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";		
        song.rate(2.5);
    }
    
}

}
}

function preload()
{
song = loadSound("music2.mp3");
}
function soundplay() {
    song.play();
    song.setVolume(1);
}
function modelLoaded() {
    console.log("Posenet Loaded In");
}
function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("left wrist x = " + leftWristX + " left wrist y = " + leftWristY);
      
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.x;
        console.log("right wrist x = " + rightWristX + " right wrist y = " + rightWristY);
    }
}
