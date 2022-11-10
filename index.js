// Setando a porta e dependências
const PORT = 3030
const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const { stringify } = require('querystring')
// ============ Setando requisições gerais e enviando arquivos staticos ======================
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/'));
app.use(bodyParser.json());
app.use('/Css', express.static('Css'))
app.use('/js', express.static('js'))
app.use('/Fonts', express.static('Fonts'))
app.use('/img', express.static('img'))
app.use('/View', express.static('View'))
// ======================================
// Pegando o Post
var palavra;
app.post('/palavra', (req, res) => {
    palavra = new Array(req.body.palavra.toLowerCase() + " ") // Pegando a palavra enviada
    res.redirect('/')
});

// Função de Ler o TXT
var lista;
fs.readFile('./Text/basededados.txt', 'utf8', (err, data) => {
    if(err){ 
        console.log(err)
    };
    lista = data.toString().split('\n'); // Após ler armazena em uma variável passando linha por linha
});

// Ao Carregar a página exibe a palavra =========================================================
var arrayPalavra;
var tamanhoPalavra;

var error;
var classBtInval
var classInval 

app.get('/', (req, res) => {
fs.readFile('./Text/basededados.txt', 'utf8', (err, data) => {
    if(err){ 
        console.log(err)
    };
    lista = data.toString().split('\n'); // Após ler armazena em uma variável passando linha por linha
});

let json = JSON.stringify(lista)
    // Função que retorna erro caso não encontre no banco de dados
    if(json.includes(palavra) == false){
        error = "Palavra não encontrada!"
        arrayPalavra = "⠀⠀⠀⠀⠀⠀⠀⠀⠀"
        classBtInval = "Cadastro"
        classInval = "Invalido"

    }else if(json.includes(palavra) == true){
        // Função de encontrar e filtrara palavra
        lista.forEach((valor, indice) => {
                if(valor.includes(palavra)){
                    let filtro = valor.slice('', valor.indexOf('(')) // Para falicitar o filtro, corto tudo que vier depois do (... nome masculino):
                        if(filtro.indexOf(palavra) <= 0){ // Para todos os resultados verdadeiros, quero que me retorne apenas o exato
                            limpandoTexto = valor.slice(valor.indexOf(':') + 1); // Corto tudo que vier antes dos dois pontos
                            arrayPalavra = limpandoTexto.split('-');
                            tamanhoPalavra = arrayPalavra.length;
                            classBtInval = "None"
                            classInval = "None"
                        }
                }
        });
        error = ""
    }
    res.render('./View/index.ejs', {palavra: arrayPalavra, tamanho: tamanhoPalavra, invalido: error, classBtInval, classInval}); // Alimento as variaveís no Ejs pelo Backend
});
// =======================================================================================================
// Parte de cadastrar Palavras
let indevido;
let repetida;

app.get('/cadastro', (req, res) => {
    res.render('./View/cadastro.ejs')
});

var ofenseList;
var cadastrandoPalavra;
var divisao;


fs.readFile('./Text/blackList.txt', 'utf8', (err, data) => {
    if (err){
        console.log(err)
    };
    ofenseList = data.toString().split('\r\n');
});

app.post('/cadastro', (req, res) => {
    cadastrandoPalavra = req.body.cadastrandoPalavra.toLowerCase();
    divisao = ' ' + req.body.divisao.toLowerCase();
    palavraCompleta = cadastrandoPalavra + ' ():' + divisao;

    let listJson = JSON.stringify(ofenseList);
    let json = JSON.stringify(lista);

        if(listJson.includes(cadastrandoPalavra) == true){
            res.redirect('/indevido')
        }else{
            if(json.includes(cadastrandoPalavra) == true){
                res.redirect('/errorPalavra')  
            }else{
                fs.appendFile('./Text/basededados.txt', '\n' + palavraCompleta, (err) => {
                    if(err) throw err;
                        console.log('Palavra Cadastrada')
                })
                res.redirect('/')
            }
        };  
})

app.get('/indevido', (req, res) => {
    let indevido = 'Palavra Indevida'
    res.render('View/indevido.ejs', {indevido})
})

app.get('/errorPalavra', (req, res) => {
    let repetida = 'Palavra já cadastrada, atenção aos acentos ou -'  
    res.render('View/errorPalavra.ejs', {repetida})
})

app.listen(PORT, () => {
    console.log(`Server open in ${PORT}`);
});