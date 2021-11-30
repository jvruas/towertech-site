function chamargraficos() {
    console.log("executei chamargraficos")
    obterDadosGraficoPrimeiraVez()
   
}



// neste JSON tem que ser 'labels', 'datasets' etc, 
// porque é o padrão do Chart.js



// altere aqui as configurações do gráfico
// (tamanhos, cores, textos, etc)
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

// altere aqui como os dados serão exibidos
// e como são recuperados do BackEnd
function obterDadosGraficoPrimeiraVez(fkComputador, fkTorre, fkEmpresa) {
    console.log("executei obterDadosGraficoPrimeiraVez")
   

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }   

    fetch(`/leituras/ultimas/${fkComputador}/${fkTorre}/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
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
                    dados.datasets[0].data.push(registro.cpuPorcentual);
                    dadosDisco.datasets[0].data.push(registro.discoPorcentual);
                    dadosRam.datasets[0].data.push(registro.ramPorcentual);
                    id_internet.innerHTML = registro.internet;
                    id_usuario.innerHTML = registro.usuarioMaq;
                    
                    

                }
                id_computador.innerHTML = fkComputador;
                console.log(JSON.stringify(dados));
               
                plotarGrafico(fkComputador, fkTorre, fkEmpresa, dados, dadosDisco, dadosRam);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}



// só mexer se quiser alterar o tempo de atualização
// ou se souber o que está fazendo!
function atualizarGrafico(fkComputador, fkTorre, fkEmpresa, dados, dadosDisco, dadosRam) {
    console.log("executei atualizarGrafico")
    fetch(`/leituras/tempo-real/${fkComputador}/${fkTorre}/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos2: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico: ${dados}`);
                console.log(novoRegistro.cpuPorcentual)

                // tirando e colocando valores no gráfico
                dados.labels.shift(); // apagar o primeiro
                dados.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dados.datasets[0].data.shift();  // apagar o primeiro de temperatura                
                dados.datasets[0].data.push(novoRegistro.cpuPorcentual); // incluir uma nova leitura de temperatura

                dadosDisco.labels.shift(); // apagar o primeiro
                dadosDisco.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dadosDisco.datasets[0].data.shift();  // apagar o primeiro de temperatura                
                dadosDisco.datasets[0].data.push(novoRegistro.discoPorcentual); // incluir uma nova leitura de temperatura

                dadosRam.labels.shift(); // apagar o primeiro
                dadosRam.labels.push(novoRegistro.momento_grafico); // incluir um novo momento
                dadosRam.datasets[0].data.shift();  // apagar o primeiro de temperatura                
                dadosRam.datasets[0].data.push(novoRegistro.ramPorcentual); // incluir uma nova leitura de temperatura

               
                id_cpu.innerHTML = `${novoRegistro.cpuPorcentual}%`
                id_disco.innerHTML = `${novoRegistro.discoPorcentual}%`
                id_ram.innerHTML = `${novoRegistro.ramPorcentual}%`

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


                proximaAtualizacao = setTimeout(() => atualizarGrafico(fkComputador, fkTorre, fkEmpresa, dados, dadosDisco, dadosRam), 5000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            proximaAtualizacao = setTimeout(() => atualizarGrafico(fkComputador, fkTorre, fkEmpresa, dados, dadosDisco, dadosRam), 5000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// só altere aqui se souber o que está fazendo!
function plotarGrafico(fkComputador, fkTorre, fkEmpresa, dados, dadosDisco, dadosRam) {
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


    setTimeout(() => atualizarGrafico(fkComputador, fkTorre, fkEmpresa, dados, dadosDisco, dadosRam), 2000);
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


function qtdTorre(fkEmpresa) {
    fetch(`/usuarios/qtdTorres/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        
        if (response.ok) {                
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                console.log(resposta);  
                for (var i = 0; i < resposta.length; i++) {
                  document.querySelector('.scrollLocalizacao').innerHTML += `
                  <details id="id_det${i}" >
                  <input id="id_torre${i}" style="display: none;" value="${resposta[i].idTorre}">
              <summary class="summary_menu">
                <div class="torres">
                  <div class="a1">
                    <h3>${resposta[i].nomeTorre}</h3>
                    <i id="" class="fas fa-angle-down"></i>
                  </div>
                </div>
              </summary>
              </details>` 
                }  
                             
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });

    return false;
}
function qtdTorre_gerente(fkEmpresa) {
    fetch(`/usuarios/qtdTorres/${fkEmpresa}`, { cache: 'no-store' }).then(function (response) {
        
        if (response.ok) {                
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                console.log(resposta);  
                for (var i = 0; i < resposta.length; i++) {
                  document.querySelector('.scrollLocalizacaoGerente').innerHTML += `
                  <details id="id_det${i}" >
                  <input id="id_torre${i}" style="display: none;" value="${resposta[i].idTorre}">
              <summary class="summary_menu">
                <div class="torres">
                  <div class="a1">
                    <h3 onclick="passarValor_gerente(${resposta[i].idTorre})">${resposta[i].nomeTorre}</h3>
                    
                  </div>
                </div>
              </summary>
              </details>` 
                }  
                             
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });

    return false;
}

function get_fk_empresa() {
    var fkEmpresa = sessionStorage.getItem('fk_empresa_meuapp')
    return fkEmpresa  
}
function get_email() {
    var email_logado = sessionStorage.getItem('login_usuario_meuapp')
    return email_logado  
}
function get_nome() {
    var nome_logado = sessionStorage.getItem('nome_usuario_meuapp')
    return nome_logado  
}


function qtdComputadoreNavBar(fkEmpresa) {
    fetch(`/usuarios/qtdComputadores/${fkEmpresa}`, {
        cache: 'no-store'
      }).then(function (response) {

        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            console.log(resposta);
            var posicao = 0;
            for (var i = 0; i < resposta.length; posicao++) {
                var id_torre = document.getElementById(`id_torre${posicao}`).value;
                console.log(id_torre)
                if (resposta[i].idTorre == id_torre) {                    
                    while (resposta[i].idTorre == id_torre) { 
                    document.querySelector(`#id_det${posicao}`).innerHTML +=`<div class="maquina">
                    <p onclick="passarValor(${resposta[i].idComputador}, ${resposta[i].idTorre})">Máquina ${resposta[i].idComputador}</p>
                    </div>`
                    i++;
                    }
                }
            }
            

          });
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
      });

    return false;
  }

   function passarValor(fkComputador, fkTorre) {
    window.location = "dash_analista.html?minhaVariavel=" + fkComputador + fkTorre;
  }

  function passarValor_gerente(fkTorre) {
    window.location = "dash_gerente.html?minhaVariavel=" + fkTorre;
  }

  function getChamados1(fkTorre, fkEmpresa, nome_torre) {
    fetch(`/chamados/getChamados/${fkTorre}/${fkEmpresa}`, {
        cache: 'no-store'
      }).then(function (response) {

        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            console.log(resposta);
           
            for (var i = 0; i < resposta.length; i++) {
               document.querySelector('.grid_chamados').innerHTML += `
               <div class="chamado" id="aberto">
               <p>${nome_torre}</p>
               <p>${resposta[i].dia}</p>
               <p>-</p>
               <p>${resposta[i].estado}</p>
             </div>
               `
            }
            

          });
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
      });

    return false;
  }

  function getChamadosAbertos(mes, fkTorre, fkEmpresa, estado) {
    fetch(`/chamados/qtdChamadosMes/${mes}/${fkTorre}/${fkEmpresa}/${estado}`, {
        cache: 'no-store'
      }).then(function (response) {

        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            console.log(resposta);

            if (estado == "aberto") {
                listaAbertos.push(resposta[0].qtd);
            } else {
                listaFechados.push(resposta[0].qtd);
            }

          });
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
      });

    return false;
  }

  function getChamadosTurnos(turno, fkTorre, fkEmpresa, estado) {
    fetch(`/chamados/qtdChamadosTurno/${turno}/${fkTorre}/${fkEmpresa}/${estado}`, {
        cache: 'no-store'
      }).then(function (response) {

        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            console.log(resposta);

            if (estado == "aberto") {
                if (turno == 1){
                    listaAbertos2[0] = (resposta[0].qtd);
                } else if (turno == 2) {
                    listaAbertos2[1] = (resposta[0].qtd);
                } else {
                    listaAbertos2[2] = (resposta[0].qtd);
                }
                
            } else {
                if (turno == 1){
                    listaFechados2[0] = (resposta[0].qtd);
                } else if (turno == 2) {
                    listaFechados2[1] = (resposta[0].qtd);
                } else {
                    listaFechados2[2] = (resposta[0].qtd);
                }
            }

          });
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
      });

    return false;
  }

  function get_chamados_analista(fkEmpresa) {
    fetch(`/chamados/getChamadosAnalista/${fkEmpresa}`, {
        cache: 'no-store'
      }).then(function (response) {

        if (response.ok) {
          response.json().then(function (resposta) {
            console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
            console.log(resposta);
           
            for (var i = 0; i < resposta.length; i++) {
               document.querySelector('.chamados').innerHTML += `
               <details>
               <summary>
                 <div class="chamado">
                   <p>${resposta[i].nomeTorre}</p>
                   <p>Máquina ${resposta[i].fkComputador}</p>
                   <p>${resposta[i].dia}</p>
                   <p>${resposta[i].estado}</p>
                   <i id="setaBaixo1" class="fas fa-angle-down"></i>
                 </div>
               </summary>
               <div class="chamadoAberto">
                 <div class="ocorrencia">
                   <h3>Ocorrência:</h3>
                   <p>Disco em 96%</p>
                 </div>
                 <div>
                   <h3>Analista:</h3>
                   <p>Danilo</p>
                 </div>
                 <div>
                   <h3>Data de conclusão:</h3>
                   <p>xx-x-x--x</p>
                 </div>
               </div>
             </details>
               `
            }
            

          });
        } else {
          console.error('Nenhum dado encontrado ou erro na API');
        }
      })
      .catch(function (error) {
        console.error(`Erro na obtenção dos dados: ${error.message}`);
      });

    return false;
  }

  function get_pagina_servidor(){
    window.location = "dash_root.html"
  }

  function verificar_pagina(permissaoPagina){
    var permissao = sessionStorage.getItem('permissao_meuapp')
    
    if(!(permissao == permissaoPagina)){
      window.alert("Sua permissão não é para essa pagina!")
      if (permissao == "A"){
        window.location = "home_analista.html"
      } else if(permissao == "G"){
        window.location = "home_gerente.html"
      } else {
        window.location = "home_root.html"
      }
    } 
  }


   