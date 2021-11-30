var express = require("express");
var router = express.Router();
var sequelize = require("../models").Database1;
var Servidor = require("../models").Servidor;
var env = process.env.NODE_ENV || "development";

/* Recuperar as últimas N leituras */
router.get("/ultimasServidor/", function (req, res, next) {
    let instrucaoSql = "";

    if (env == "dev") {
        // abaixo, escreva o select de dados para o Workbench
        instrucaoSql = `select cpuPercentual, ramPercentual, discoPercentual, dataHora, 
		DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbDadosServidor order by idDadoServidor desc limit 10`;
    } else if (env == "production") {
        // abaixo, escreva o select de dados para o SQL Server
        instrucaoSql = `select top ${limite_linhas} 
		temperatura, 
		umidade, 
		momento,
		FORMAT(momento,'HH:mm:ss') as momento_grafico
		from leitura
		where fkcaminhao = ${idcaminhao}
		order by id desc`;
    } else {
        console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n");
    }

    sequelize
        .query(instrucaoSql, {
            model: Servidor,
            mapToModel: true,
        })
        .then((resultado) => {
            console.log(`Encontrados: ${resultado.length}`);
            res.json(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get("/tempo-real-servidor", function (req, res, next) {
    let instrucaoSql = "";

    if (env == "dev") {
        // abaixo, escreva o select de dados para o Workbench
        instrucaoSql = `select cpuPercentual, ramPercentual, discoPercentual, dataHora, 
		DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbDadosServidor order by idDadoServidor desc limit 10`;
    } else if (env == "production") {
        // abaixo, escreva o select de dados para o SQL Server
        instrucaoSql = `select top 1 temperatura, umidade, FORMAT(momento,'HH:mm:ss') as momento_grafico, fkcaminhao from leitura where fkcaminhao = ${idcaminhao} order by id desc`;
    } else {
        console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n");
    }

    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then((resultado) => {
            res.json(resultado[0]);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get("/getInfos/:parametro", function (req, res, next) {
    let instrucaoSql = "";

    var parametro = req.params.parametro;

    if (parametro == 1) {
        instrucaoSql = `select count(idEmpresa) as 'idEmpresa' from tbEmpresas;`;
    } else if (parametro == 2) {
        instrucaoSql = `select count(idTorre) as 'idTorre' from tbTorres;`;
    } else if (parametro == 3) {
        instrucaoSql = `select count(idFuncionario) as 'idFunc' from tbFuncionarios;`;
    } else {
        instrucaoSql = `select count(idComputador) as 'idComp' from tbComputadores;`;
    }

    // abaixo, escreva o select de dados para o Workbench

    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
        .then((resultado) => {
            res.json(resultado[0]);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

module.exports = router;
