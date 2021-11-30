let chamado1Aberto = false
let chamado2Aberto = false

function abrirChamado1() {
    if (chamado1Aberto) {
        chamado1Aberto = false
        chamadoAberto1.style.display = "none"
        setaBaixo1.style.display = "block"
        setaCima1.style.display = "none"
    } else {
        chamado1Aberto = true
        chamadoAberto1.style.display = "block"
        // chamado1.style.margin-bottom = "0%"
        setaBaixo1.style.display = "none"
        setaCima1.style.display = "block"
    }
}

function abrirChamado2() {
    if (chamado2Aberto) {
        chamado2Aberto = false
        chamadoAberto2.style.display = "none"
        setaBaixo2.style.display = "block"
        setaCima2.style.display = "none"
    } else {
        chamado2Aberto = true
        chamadoAberto2.style.display = "block"
        setaBaixo2.style.display = "none"
        setaCima2.style.display = "block"
    }
}