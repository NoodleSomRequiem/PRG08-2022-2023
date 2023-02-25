const btn = document
const video = document.getElementById("webcam");
const label = document.getElementById("label");

const labelThreeBtn = document.querySelector("#labelThree");
const labelFourBtn = document.querySelector("#labelFour");

labelThreeBtn.addEventListener("click", () => classifyModel() );
labelFourBtn.addEventListener ("click", () => {
    speak(`hello, today we will be looking for rats and cats, please aim your camera at a rat or a cat and click on recognize. your device will recognize if its a kitty, or a ratty!`); })


    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({video: true})
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
        featureExtractor.load("model/model.json");
        console.log('Model Loaded!');
    }

    const classifier = featureExtractor.classification(video, videoReady);


// Triggers when the video is ready
    function videoReady() {
        console.log('You are ready to go!');
    }

//train button
// Add a new image with a label


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

    function classifyModel() {
// Get a prediction for that image

        classifier.classify(video, (err, result) => {
            console.log(result); // Should output 'dog'
            label.innerText = result[0].label + result[0].confidence;
            speak(result[0].label);
        });
    }


    let synth = window.speechSynthesis


    speak("welcome to Rat&Cat")

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



