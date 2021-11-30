var express = require("express");
var router = express.Router();
var sequelize = require("../models").Database1;
var Leitura = require("../models").Leitura;
var env = process.env.NODE_ENV || "development";

/* Recuperar as últimas N leituras */
router.get(
    "/ultimas/:fkComputador/:fkTorre/:fkEmpresa",
    function (req, res, next) {
        var fkComputador = req.params.fkComputador;
        var fkTorre = req.params.fkTorre;
        var fkEmpresa = req.params.fkEmpresa;

        let instrucaoSql = "";

        if (env == "dev") {
            // abaixo, escreva o select de dados para o Workbench
            instrucaoSql = `select internet, usuarioMaq, cpuPorcentual, ramPorcentual, discoPorcentual, dataHora, 
		DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbDadosComputadores 
		where fktorre = ${fkTorre} and fkComputador = ${fkComputador} and fkEmpresa = ${fkEmpresa}
		order by idDadoComputador desc limit 10;`;
        } else if (env == "production") {
            // abaixo, escreva o select de dados para o SQL Server
            instrucaoSql = ``;
        } else {
            console.log(
                "\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n"
            );
        }

        sequelize
            .query(instrucaoSql, {
                model: Leitura,
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
    }
);

router.get(
    "/tempo-real/:fkComputador/:fkTorre/:fkEmpresa",
    function (req, res, next) {
        var fkComputador = req.params.fkComputador;
        var fkTorre = req.params.fkTorre;
        var fkEmpresa = req.params.fkEmpresa;

        let instrucaoSql = "";

        if (env == "dev") {
            // abaixo, escreva o select de dados para o Workbench
            instrucaoSql = `select internet, usuarioMaq, cpuPorcentual, ramPorcentual, discoPorcentual, dataHora, 
		DATE_FORMAT(dataHora,'%H:%i:%s') as momento_grafico from tbDadosComputadores where fktorre = ${fkTorre} and fkComputador = ${fkComputador} and fkEmpresa = ${fkEmpresa} order by idDadoComputador desc limit 10`;
        } else if (env == "production") {
            // abaixo, escreva o select de dados para o SQL Server
            instrucaoSql = ``;
        } else {
            console.log(
                "\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n"
            );
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
    }
);

router.get(
    "/valorCpu/:fkComputador/:fkTorre/:fkEmpresa",
    function (req, res, next) {
        var fkComputador = req.params.fkComputador;
        var fkTorre = req.params.fkTorre;
        var fkEmpresa = req.params.fkEmpresa;

        let instrucaoSql = "";

        if (env == "dev") {
            // abaixo, escreva o select de dados para o Workbench
            instrucaoSql = `select cpuPorcentual as 'valorCpu', ramPorcentual as 'valorRam', discoPorcentual as 'valorDisco' from tbDadosComputadores where fkcomputador = ${fkComputador} and fktorre = ${fkTorre} and fkEmpresa = ${fkEmpresa} order by idDadoComputador desc limit 10`;
        } else if (env == "production") {
            // abaixo, escreva o select de dados para o SQL Server
            instrucaoSql = ``;
        } else {
            console.log(
                "\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n"
            );
        }

        console.log(instrucaoSql);

        sequelize
            .query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
            .then((resultado) => {
                res.json(resultado);
            })
            .catch((erro) => {
                console.error(erro);
                res.status(500).send(erro.message);
            });
    }
);

module.exports = router;
