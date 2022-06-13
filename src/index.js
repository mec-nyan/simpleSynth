import "./style.css";

const body = document.body;

const h1 = document.createElement("h1");
h1.innerText = "Simple JSynth";
body.appendChild(h1);

const waves = ["sine", "square", "triangle", "sawtooth"];
const waveButtons = [];

const waveSelector = document.createElement("div");
waveSelector.className = "waveSelector";

const waveSelectorTitle = document.createElement("span");
waveSelectorTitle.innerText = "waveform";
waveSelectorTitle.className = "selectorTag";
waveSelector.appendChild(waveSelectorTitle);

waves.forEach((w) => {
  const wb = document.createElement("button");
  wb.innerText = w;
  wb.className = "waveButton";
  if (w === "sine") wb.classList.add("waveSelected");
  wb.addEventListener("click", selectWave);
  waveSelector.appendChild(wb);
  waveButtons.push(wb);
});

body.appendChild(waveSelector);

const btn = document.createElement("button");
btn.classList.add("play");
btn.innerText = "Play";
body.appendChild(btn);

const audioContext = new AudioContext();

const osc = audioContext.createOscillator();

osc.type = "sine";
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

body.addEventListener("keydown", selectWave);

// ----------------------------------------------
function selectWave(e) {
  if (e.type === "click") {
    for (let wb of waveButtons) {
      wb.classList.remove("waveSelected");
    }
    e.target.classList.add("waveSelected");
    osc.type = e.target.innerText;
  }
  if (e.type === "keydown") {
    const n = parseInt(e.key);
    if (!isNaN(parseInt(n)) && n <= 4 && n > 0) {
      for (let wb of waveButtons) {
        wb.classList.remove("waveSelected");
      }
      waveButtons[n - 1].classList.add("waveSelected");
      osc.type = waveButtons[n - 1].innerText;
    }
  }
}
