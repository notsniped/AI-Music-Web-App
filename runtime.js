song = '';
song2 = '';
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
function preload() {
    song = loadSound('music.mp3');
    song2 = loadSound('music2.mp3');
}
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        // Left Wrist
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log('LeftWrist X = ' + leftWristX + '; LeftWrist Y = ' + leftWristY);
        // Right Wrist
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log('RightWrist X = ' + rightWristX + '; RightWrist Y = ' + rightWristY);
    }
}
function modelLoaded() {
    console.log('PoseNet Initialized.');
}
function draw() {
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');
    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimal = floor(InNumberleftWristY);
        volume = remove_decimal/1000;
        document.getElementById('volume').innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
