const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelOneBtn = document.querySelector("#labelOne");
const labelTwoBtn = document.querySelector("#labelTwo");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");
const savebtn =  document. querySelector("#save")

labelOneBtn.addEventListener("click", () => addCat);
labelTwoBtn.addEventListener("click", () => addRat());
labelThreeBtn.addEventListener("click", () => classifyModel() );
trainbtn.addEventListener("click", () => TrainModel());
savebtn.addEventListener("click",()=>save());

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((err) => {
            console.log("Something went wrong!");
        });
}

label.innerText = "Ready when you are!";

// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
    label.innerText = `loading...`;
    featureExtractor.load("model/model.json");
    console.log('Model Loaded!');
}

const classifier = featureExtractor.classification(video, videoReady);

// Create a new classifier using those features and with a video element
function classifyImage() {
    const classifier = featureExtractor.classification(video, videoReady);
}

// Triggers when the video is ready
function videoReady() {
    console.log('You are ready to go!');
}
//train button
// Add a new image with a label


console.log("Hello friend, lets get started!")
function addCat() {
    classifier.addImage(video, 'kitty');
}
function addRat() {
    classifier.addImage(video, 'ratty');
}

// Retrain the network
// function train() {
//     classifier.train((lossValue) => {
//         console.log('Loss is', lossValue);
//     });
// }
function TrainModel() {
    classifier.train((lossValue) => {
        console.log('Loss is', lossValue);
    });
}
function classifyModel(){
// Get a prediction for that image
    classifier.classify(video, (err, result) => {
        console.log(result); // Should output 'dog'
    });
}
function save() {
    label.innerText = `model saved to download folder.`;
    featureExtractor.save();
}




//wip
let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        synth.speak(utterThis)
    }
}

speak("Hello user")

btn.addEventListener("click", () => {
    speak(`I think it's a kitty!`)
})

let voices = window.speechSynthesis.getVoices()
let name = "Sem"
utterThis.voice = voices.filter(function(voice) { return voice.name == name; })[0]


let inputField = document.querySelector("#inputfield")
let playButton = document.querySelector("#playbutton")

playButton.addEventListener("click", () => {
    let text = inputField.value
    speak(text)
})

//also wip
const image = document.getElementById('output')
const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})

image.addEventListener('load', () => userImageUploaded())

function userImageUploaded(){
    console.log("The image is now visible in the DOM")
}
