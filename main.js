song_dna = "";
song_boywithluv = "";
leftwristx=0;
leftwristy=0;
scoreleftwrist=0;
rightwristx=0;
rightwristy=0;
scorerightwrist=0;
song1status="";
song2status="";

function preload() {
    song_dna = loadSound("dna.mp3");
    song_boywithluv = loadSound("bwl.mp3")
}

function setup() {
    canvas = createCanvas(400, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);

}

function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("score leftwrist " + scoreleftwrist);
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("score rightwrist " + scorerightwrist);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log('leftwrist x = ' + leftwristx + '   leftwrist y = ' + leftwristy);
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log('rightwrist x = ' + rightwristx + '   rightwrist y = ' + rightwristy);



    }
}

function draw() {
    image(video, 0, 0, 400, 300);
     fill("red")
     stroke("red")
     song1status=song_dna.isPlaying()
     song2status=song_boywithluv.isPlaying()
     if(scoreleftwrist > 0.2){
        circle(leftwristx,leftwristy,20)
        document.getElementById("songname").innerHTML=" DNA is being played"
      song_boywithluv.stop()
      if(song1status!=true){
        song_dna.play()
      }
     }
     if(scorerightwrist > 0.2){
        circle(rightwristx,rightwristy,20)
        document.getElementById("songname").innerHTML=" Boy with luv is being played"
        song_dna.stop()
        if(song2status != true){
            song_boywithluv.play()
        }
     }
     
     
}

