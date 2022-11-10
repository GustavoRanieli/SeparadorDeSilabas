const synth = window.speechSynthesis; // chamada SpeechSynthesis API
const caixaDeTexto = document.querySelectorAll('[silaba]'); // caixa de texto
const selectVoices = document.querySelector('select'); // lista de vozes

caixaDeTexto.disable = true;

let voices = [];
function getVoices() { 
  voices = synth.getVoices(); // armazena as vozes no array
  voices.forEach((voice, index) => {
    console.log(index)
      if(index == 237){
        selectVoices.add(new Option(`${voice.name} (${voice.lang})`, index)); // adiciona as informações na lista de seleção..
      }
  });
}

window.addEventListener('load', () => { // ao ser concluído..
  getVoices(); // carrega as vozes..
  if (synth.onvoiceschanged !== undefined)
    synth.onvoiceschanged = getVoices; // checa e atualiza o evento
});

// dispara um evento ao clicar no botão!
caixaDeTexto.forEach(elements => {
    elements.onclick = (e) => {
      let input = e.target
        var utter = new SpeechSynthesisUtterance(input.value); // responsável pelo que vai falar!
        utter.voice = voices[selectVoices.value]; // define qual será a voz..
        synth.speak(utter);
    }
  }
);
