import "./style.css";

const body = document.body;
const btn = document.getElementById("btn1");

const audioContext = new AudioContext();

const osc = audioContext.createOscillator();

osc.type = "sawtooth";
osc.frequency.value = 55;

const gain = audioContext.createGain();

osc.connect(gain);
gain.connect(audioContext.destination);
osc.start();
gain.gain.value = 0;

function play(e) {
  if (e.type === "mousedown" || (e.type === "keydown" && e.key === "j")) {
    gain.gain.value = 1;
    btn.classList.add("hightlighted");
  }
}

function stop(e) {
  if (e.type === "mouseup" || (e.type === "keyup" && e.key === "j")) {
    gain.gain.value = 0;
    btn.classList.remove("hightlighted");
  }
}

btn.addEventListener("mousedown", play);
btn.addEventListener("mouseup", stop);

body.addEventListener("keydown", play);
body.addEventListener("keyup", stop);
