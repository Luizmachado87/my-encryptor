const inserirTexto = document.getElementById('inserirTexto');
const botaoEncriptar = document.getElementById('botaoEncriptar');
const botaoDesencriptar = document.getElementById('botaoDesencriptar');
const botaoCopiar = document.getElementById('botaoCopiar');
const garoto = document.getElementById('garoto');
const rightInfo = document.getElementById('rightInfo');
const mensagemFinal = document.getElementById('mensagemFinal');
const right = document.getElementById('right');


let remplazar = [
    ['e', 'enter'],
    ['o', 'ober'],
    ['i', 'imes'],
    ['a', 'ai'],
    ['u', 'ufat'],
];


const replace = (novoValor) => {
    mensagemFinal.innerHTML = novoValor;

    garoto.classList.add('oculto');
    inserirTexto.value = '';
    rightInfo.style.display = 'none';
    botaoCopiar.style.display = 'block';
    right.classList.add('ajustar');
    mensagemFinal.classList.add('ajustar');
};


const reset = () => {
    mensagemFinal.innerHTML = '';
    garoto.classList.remove('oculto');
    rightInfo.style.display = 'block';
    botaoCopiar.style.display = 'none';
    right.classList.remove('ajustar');
    mensagemFinal.classList.remove('ajustar');
    inserirTexto.focus();
};

const encriptar = (texto) => { // confere se é isso mesmo.
    let resultado = '';
    for (let char of texto) {
        let substituido = false;
        for (let [original, substituto] of remplazar) {
            if (char === original) {
                resultado += substituto;
                substituido = true;
                break;
            }
        }
        if (!substituido) resultado += char;
    }
    return resultado;
};

const desencriptar = (texto) => {
    for (let [original, substituto] of remplazar) {
        texto = texto.replaceAll(substituto, original);
    }
    return texto;
};

const validarTexto = (texto) => {
    const regex = /^[a-z\s]+$/; 
    responsiveVoice.speak(texto, 'UK English Male', { rate: 1.0 }); // Estava no local errado, depois do return
    return regex.test(texto);

};

botaoEncriptar.addEventListener('click', () => {
    const texto = inserirTexto.value;
    if (validarTexto(texto)) {
        replace(encriptar(texto));
    } else {
        alert('Please use only lowercase letters and no special characters.');
        reset();
    }
});

botaoDesencriptar.addEventListener('click', () => {
    const texto = inserirTexto.value;
    if (validarTexto(texto)) {
        replace(desencriptar(texto));
    } else {
        alert('Please use only lowercase letters and no special characters.');
        reset();
    }
});

botaoCopiar.addEventListener('click', () => {
    const texto = mensagemFinal.innerHTML;
    navigator.clipboard.writeText(texto).then(() => {
        alert('Text copied!');
        reset();
    });
});