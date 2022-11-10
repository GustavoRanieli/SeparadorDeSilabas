window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.interimResults = true;
recognition.lang = 'pt-br'
recognition.continuous = true

recognition.onresult = (e) => {
    const cor = e.results[0][0].transcript
    const resultado = cor.replace(/[.,?!\s]/g, '')    
    document.querySelector('#textInput').value =  resultado.toLowerCase()
}

const record = function(botao){
    recognition.start()

    setTimeout(() =>{
        recognition.stop()
    }, 3000)
}


