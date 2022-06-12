import "./style.css";

const btn = document.getElementById("btn1");

const audioContext = new AudioContext();

const osc = audioContext.createOscillator();
osc.type = "sawtooth";
osc.frequency.value = 55;
osc.start();

function play() {
  if (audioContext.state === "suspended") audioContext.resume();
  osc.connect(audioContext.destination);
}

function stop() {
  if (audioContext.state === "suspended") audioContext.resume();
  osc.disconnect();
}

btn.addEventListener("mousedown", play);
btn.addEventListener("mouseup", stop);
