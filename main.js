const synth = window.speechSynthesis;

const jaInput = document.querySelector("#ja-input");
const jaSelect = document.querySelector("#ja-voice-select");

const enInput = document.querySelector("#en-input");
const enSelect = document.querySelector("#en-voice-select");

enInput.value = "Hello! This is a text to speech test.";
jaInput.value = "こんにちは、これは音声読み上げのテストです。";

const allowedVoices = [
  "Kyoko",
  "O-Ren",
  "Hattori",
  "Otoya",
  "Samantha",
  "Daniel",
  "Karen",
  "Google",
];

let loadedVoices = [];

const defaultVoices = {
  "ja-JP": "Kyoko",
  "en-AU": "Karen",
};

function loadVoices() {
  console.log("load Voices");
  loadedVoices = synth.getVoices();

  for (let voice of loadedVoices) {
    console.log(voice);
    if (
      allowedVoices.some((v) => voice.name.includes(v)) &&
      (voice.lang.includes("ja") || voice.lang.includes("en"))
    ) {
      const option = document.createElement("option");
      option.textContent = `${voice.name} (${voice.lang})`;
      option.value = voice.name;

      if (voice.lang.includes("ja")) {
        jaSelect.appendChild(option);
      } else {
        enSelect.appendChild(option);
      }
    }
  }
}

console.log("loading script");
loadVoices();
if ("onvoiceschanged" in synth) {
  synth.onvoiceschanged = loadVoices;
}

function speakJapanese() {
  const voice = loadedVoices.find(
    (v) => v.name === jaSelect.selectedOptions[0].value,
  );
  const utterance = new SpeechSynthesisUtterance(jaInput.value);
  utterance.voice = voice;

  synth.speak(utterance);
}

function speakEnglish() {
  const voice = loadedVoices.find(
    (v) => v.name === enSelect.selectedOptions[0].value,
  );
  const utterance = new SpeechSynthesisUtterance(enInput.value);
  utterance.voice = voice;

  synth.speak(utterance);
}

function speak() {
  const voices = synth.getVoices();

  const voice = synth.getVoices().find((v) => v.name === "O-ren");
  const utterance = new SpeechSynthesisUtterance(input.value);

  // utterance.lang = "en-AU";
  utterance.lang = "ja-JP";
  console.log(utterance);
  utterance.voice = voice;
  synth.speak(utterance);
}
