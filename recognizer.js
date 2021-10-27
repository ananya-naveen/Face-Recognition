Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach(camera);

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='capture_img' src='"+data_uri+"'>";
    });
}

console.log("ml5 version: ",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/h3aG9Fp6v/model.json',modelLoaded);
function modelLoaded(){
    console.log("Model is Loaded");
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("MemberName").innerHTML=results[0].label;
        confidence=results[0].confidence*100;
        document.getElementById("MemberAccuracy").innerHTML=confidence.toFixed(0)+"%";
    }
}