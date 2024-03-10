const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = window.speechSynthesis,
isSpeaking = false;

function voices(){
    voiceList.innerHTML = ""; // Clearing previous options
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

window.speechSynthesis.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synth.getVoices().find(voice => voice.name === voiceList.value);
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
            isSpeaking = true;
            speechBtn.innerText = "Pause Speech";
        } else {
            if(isSpeaking){
                synth.pause();
                isSpeaking = false;
                speechBtn.innerText = "Resume Speech";
            } else {
                synth.resume();
                isSpeaking = true;
                speechBtn.innerText = "Pause Speech";
            }
        }
    }
});
