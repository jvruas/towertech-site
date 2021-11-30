let resposta1Aberta = false
let resposta2Aberta = false
let resposta3Aberta = false
let resposta4Aberta = false

function abrirResposta1() {
    if (resposta1Aberta) {
        resposta1.style.display = "none"
        resposta1_icon_close.style.display = "none"
        resposta1_icon_open.style.display = "block"
        resposta1Aberta = false
    } else {
        resposta1.style.display = "block"
        resposta1_icon_close.style.display = "block"
        resposta1_icon_open.style.display = "none"
        resposta1Aberta = true
    }

}

function abrirResposta2() {
    if (resposta2Aberta) {
        resposta2.style.display = "none"
        resposta2_icon_close.style.display = "none"
        resposta2_icon_open.style.display = "block"
        resposta2Aberta = false
    } else {
        resposta2.style.display = "block"
        resposta2_icon_close.style.display = "block"
        resposta2_icon_open.style.display = "none"
        resposta2Aberta = true
    }

}

function abrirResposta3() {
    if (resposta3Aberta) {
        resposta3.style.display = "none"
        resposta3_icon_close.style.display = "none"
        resposta3_icon_open.style.display = "block"
        resposta3Aberta = false
    } else {
        resposta3.style.display = "block"
        resposta3_icon_close.style.display = "block"
        resposta3_icon_open.style.display = "none"
        resposta3Aberta = true
    }

}

function abrirResposta4() {
    if (resposta4Aberta) {
        resposta4.style.display = "none"
        resposta4_icon_close.style.display = "none"
        resposta4_icon_open.style.display = "block"
        resposta4Aberta = false
    } else {
        resposta4.style.display = "block"
        resposta4_icon_close.style.display = "block"
        resposta4_icon_open.style.display = "none"
        resposta4Aberta = true
    }

}