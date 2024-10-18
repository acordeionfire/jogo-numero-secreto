
let numeroLimite = 10
let numerosSorteados = []
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 0

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    let idioma = tag == 'h1' ? 'UK English Female' : 'Brazilian Portuguese Female';
    responsiveVoice.speak(texto, idioma, {rate:1.2} );
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Secret Number Game X');
    exibirTextoNaTela('p', `Manda teu chute entre 1 e ${numeroLimite}`);
}
exibirMensagemInicial()

function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() *numeroLimite +1);
    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        console.log(numerosSorteados);
        return numeroEscolhido;
    }    
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(numeroSecreto);
    tentativas ++;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Congratulations!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `Você precisou de ${tentativas} ${palavraTentativa}`);
        document.getElementById('reiniciar').removeAttribute('disabled')
        document.getElementById('chute').setAttribute('disabled', true)
    } else {
        if (chute < numeroSecreto){
            exibirTextoNaTela('p', 'O número é maior');
        } else {
            exibirTextoNaTela('p', 'O número é menor');
        }
    limparCampo()    
    } 
}



function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0
    limparCampo();
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
    document.getElementById('chute').removeAttribute('disabled')
}