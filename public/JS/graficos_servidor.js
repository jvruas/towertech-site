function configurarGrafico() {
    console.log("executei configurarGrafico")
    var configuracoes = {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 500 },
        hoverMode: 'index',
        stacked: false,
        title: {
            display: true,
            text: ''
        },
        scales: {
            yAxes: [{
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: true,
                position: 'left',
                id: 'y-temperatura',
            }, {
                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                display: false,
                position: 'right',
                id: 'y-umidade',

                // grid line settings
                gridLines: {
                    drawOnChartArea: false, // only want the grid lines for one axis to show up
                },
            }],
        }
    };

    return configuracoes;
}


function obterDadosGraficoPrimeiraVez() {
    console.log("executei obterDadosGraficoPrimeiraVez")
   

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }   

    fetch(`/servidores/ultimasServidor/`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                
                var dados = {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'y-temperatura',
                            label: 'CPU',
                            borderColor: 'rgba(255,0,0,1)',
                            backgroundColor: ['rgba(255,0,0,1)', 'rgba(255,0,0,255)'],
                            fill: false,
                            data: []
                        }
                    ]
                };
                var dadosDisco = {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'y-temperatura',
                            label: 'DISCO',
                            borderColor: 'rgba(255,0,0,1)',
                            backgroundColor: 'rgba(255,0,0,1)',
                            fill: false,
                            data: []
                        }
                    ]
                };
                var dadosRam = {
                    labels: [],
                    datasets: [
                        {
                            yAxisID: 'y-temperatura',
                            label: 'RAM',
                            borderColor: 'rgba(255,0,0,1)',
                            backgroundColor: 'rgba(255,0,0,1)',
                            fill: false,
                            data: []
                        }
                    ]
                };
                for (i = 0; i < resposta.length; i++) {
                    var registro = resposta[i];
                    dados.labels.push(registro.momento_grafico);
                    dadosDisco.labels.push(registro.momento_grafico);
                    dadosRam.labels.push(registro.momento_grafico);
                    dados.datasets[0].data.push(registro.cpuPercentual);
                    dadosDisco.datasets[0].data.push(registro.discoPercentual);
                    dadosRam.datasets[0].data.push(registro.ramPercentual);
                    
                    

                }                
                console.log(JSON.stringify(dados));
               
                plotarGrafico(dados, dadosDisco, dadosRam);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


function atualizarGrafico(dados, dadosDisco, dadosRam) {
    console.log("executei atualizarGrafico")
    fetch(`/servidores/tempo-real-servidor/`, { cache: 'no-store' }).then(function (response) {
        
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos2: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);
                console.log(novoRegistro.cpuPercentual)

                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dados.datasets[0].data.shift();  // apagar o primeiro de temperatura                
                dados.datasets[0].data.push(novoRegistro.cpuPercentual); // incluir uma nova leitura de temperatura

                dadosDisco.labels.shift(); // apagar o primeiro
                dadosDisco.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dadosDisco.datasets[0].data.shift();  // apagar o primeiro de temperatura                
                dadosDisco.datasets[0].data.push(novoRegistro.discoPercentual); // incluir uma nova leitura de temperatura

                dadosRam.labels.shift(); // apagar o primeiro
                dadosRam.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dadosRam.datasets[0].data.shift();  // apagar o primeiro de temperatura                
                dadosRam.datasets[0].data.push(novoRegistro.ramPercentual); // incluir uma nova leitura de temperatura

               
                // id_cpu.innerHTML = `${novoRegistro.cpuPorcentual}%`
                // id_disco.innerHTML = `${novoRegistro.discoPorcentual}%`
                // id_ram.innerHTML = `${novoRegistro.ramPorcentual}%`

                dados.datasets[0].backgroundColor = funcaoCorCpu(dados, novoRegistro);
                dados.datasets[0].borderColor = funcaoCorCpu(dados, novoRegistro);
                dadosRam.datasets[0].backgroundColor = funcaoCorRam(dadosRam, novoRegistro);
                dadosRam.datasets[0].borderColor = funcaoCorRam(dadosRam, novoRegistro);
                dadosDisco.datasets[0].backgroundColor = funcaoCorDisco(dadosDisco, novoRegistro);
                dadosDisco.datasets[0].borderColor = funcaoCorDisco(dadosDisco, novoRegistro);
                // document.querySelector.('.conexao__internet').color = "red";
                

                

                window.grafico_linha.update();
                window.grafico_linha_Disco.update();
                window.grafico_linha_Ram.update();


                proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, dadosDisco, dadosRam), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGrafico(dados, dadosDisco, dadosRam), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// só altere aqui se souber o que está fazendo!
function plotarGrafico(dados, dadosDisco, dadosRam) {
    console.log("executei plotarGrafico")
    console.log('iniciando plotagem do gráfico...');

    var ctx = canvas_grafico.getContext('2d');
    var ctxDisco = canvas_grafico1.getContext('2d');
    var ctxRam = canvas_grafico2.getContext('2d');
   
    
    window.grafico_linha = Chart.Line(ctx, {
        data: dados,
        options: configurarGrafico()
    });
 
    window.grafico_linha_Disco = Chart.Line(ctxDisco, {
        data: dadosDisco,
        options: configurarGrafico()
    });
    window.grafico_linha_Ram = Chart.Line(ctxRam, {
        data: dadosRam,
        options: configurarGrafico()
    });


    setTimeout(() => atualizarGrafico(dados, dadosDisco, dadosRam), 2000);
}

function funcaoCorCpu(dados, novoRegistro) {
    if (novoRegistro.cpuPorcentual == null) {
        var valor = 20
    }
    else {
        valor = novoRegistro.cpuPorcentual;
    }
    if (valor > 0 && valor < 35) {
        return "green"
    }
    else if (valor > 35 && valor < 75) {
        return "yellow"        
    }

    else if (valor > 75 ) {
        return "red"
    }
    return "green"
}

function funcaoCorRam(dados, novoRegistro) {
    if (novoRegistro.ramPorcentual == null) {
        var valor = 20
    }
    else {
        valor = novoRegistro.ramPorcentual;
    }
    if (valor > 0 && valor < 20) {
        return "green"
    }
    else if (valor > 20 && valor < 60) {
        return "yellow"        
    }

    else if (valor > 75 ) {
        return "red"
    }
    return "green"
}

function funcaoCorDisco(dados, novoRegistro) {
    if (novoRegistro.discoPorcentual == null) {
        var valor = 20
    }
    else {
        valor = novoRegistro.discoPorcentual;
    }
    if (valor > 0 && valor < 40) {
        return "green"
    }
    else if (valor > 40 && valor < 85) {
        return "yellow"        
    }

    else if (valor > 85 ) {
        return "red"
    }
    return "green"
}


   