function main(){
    const botao = document.getElementById('microfone')
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 100;

    class Bar { 
        constructor(x, y, width, height, color){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
        }
        update(micInput){
            this.height = micInput * 250
    
        }
        draw(context){
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }


    const microphone = new Microphone()
    let bars = []
    let barWidth = canvas.width / 256

    function createBars(){
        for(let i = 0; i< 256; i++){
            bars.push(new Bar(i * barWidth, canvas.height / 2, 1, 15000,'#91d8f8'))
        }
    }
    createBars()
    
    function animate(){
        if(microphone.initialized == true){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const samples = microphone.getSamples()
            bars.forEach(function(bar, i){
                bar.update(samples[i])
                bar.draw(ctx)
            })
           
        }
        requestAnimationFrame(animate)

    }
    animate()
  }

