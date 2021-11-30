var express = require("express");
var router = express.Router();
var sequelize = require("../models").Database1;
var sequelize2 = require("../models/").Database2;
var Chamado = require("../models").Chamado;

/* Cadastrar Chamado */
router.post(
    "/cadastrarChamado/:idChamado/:fkEmpresa/:fkComputador/:fkTorre/:descricao",
    function (req, res, next) {
        console.log("Cadastrando chamado");

        var data = new Date();
        var data_atual = `${data.getFullYear()}-${data.getMonth()}-${data.getDay()}`;
        var status = "Aberto";

        let instrucaoSql = `INSERT INTO tbChamados VALUES (${req.params.idChamado}, ${req.params.fkComputador}, ${req.params.fkTorre}, ${req.params.fkEmpresa}, '${req.params.descricao}', '${data_atual}', null, '${status}')`;

        // Chamado.create({
        //     idChamado: req.params.idChamado,
        //     fkComputador: req.params.fkComputador,
        //     fkTorre: req.params.fkTorre,
        //     fkEmpresa: req.params.fkEmpresa,
        //     descricao: req.params.descricao,
        //     dataAbertura: data_atual,
        //     estado: status,
        // })
        sequelize
            .query(instrucaoSql, {
                model: Chamado,
            })
            .then((resultado) => {
                console.log(`Registro criado: ${resultado}`);
                res.send(resultado);
            })
            .catch((erro) => {
                console.error(erro);
                res.status(500).send(erro.message);
            });

        sequelize2
            .query(instrucaoSql, {
                model: Chamado,
            })
            .then((resultado) => {
                console.log(`Registro criado: ${resultado}`);
                res.send(resultado);
            })
            .catch((erro) => {
                console.error(erro);
                res.status(500).send(erro.message);
            });
    }
);

/* Recupera o valor chamados de cada computador */
router.get(
    "/qtdChamados/:fkComputador/:fkTorre/:fkEmpresa",
    function (req, res, next) {
        console.log("Recuperando numero de chamados");

        var torre = req.params.fkTorre;
        var computador = req.params.fkComputador;
        var empresa = req.params.fkEmpresa;

        let instrucaoSql = `select count(idChamado) as 'id' from tbChamados where fkComputador = ${computador} and fkTorre =${torre} and fkEmpresa = ${empresa};`;
        console.log(instrucaoSql);

        sequelize
            .query(instrucaoSql, {
                model: Chamado,
            })
            .then((resultado) => {
                console.log(`Encontrados: ${resultado}`);
                res.json(resultado);
            })
            .catch((erro) => {
                console.error(erro);
                res.status(500).send(erro.message);
            });
    }
);

/* Recupera o valor chamados de cada computador */
router.get("/getChamados/:fkTorre/:fkEmpresa", function (req, res, next) {
    console.log("Recuperando numero de chamados");

    var torre = req.params.fkTorre;
    var empresa = req.params.fkEmpresa;

    let instrucaoSql = `select *, DATE_FORMAT(dataABertura,'%d/%m/%y') as 'dia' from tbChamados where fkTorre = ${torre} and fkEmpresa = ${empresa};`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Chamado,
        })
        .then((resultado) => {
            console.log(`Encontrados: ${resultado}`);
            res.json(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get("/getChamadosAnalista/:fkEmpresa", function (req, res, next) {
    console.log("Recuperando numero de chamados");

    var empresa = req.params.fkEmpresa;

    let instrucaoSql = `select *, DATE_FORMAT(dataABertura,'%d/%m/%y') as 'dia' from tbChamados join tbTorres where tbChamados.fkEmpresa = ${empresa} and tbTorres.fkEmpresa = ${empresa} and fkTorre = idTorre;`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Chamado,
        })
        .then((resultado) => {
            console.log(`Encontrados: ${resultado}`);
            res.json(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

/* Recupera o valor chamados de cada computador */
router.get("/getNomeTorre/:fkTorre/:fkEmpresa", function (req, res, next) {
    console.log("Recuperando numero de chamados");

    var torre = req.params.fkTorre;
    var empresa = req.params.fkEmpresa;

    let instrucaoSql = `select nomeTorre from tbTorres where idTorre = ${torre} and fkEmpresa = ${empresa};`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Chamado,
        })
        .then((resultado) => {
            console.log(`Encontrados: ${resultado}`);
            res.json(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

router.get(
    "/qtdChamadosMes/:mes/:fkTorre/:fkEmpresa/:estado",
    function (req, res, next) {
        console.log("Recuperando numero de chamados por mês");

        var torre = req.params.fkTorre;
        var empresa = req.params.fkEmpresa;
        var mes = req.params.mes;
        var status = req.params.estado;

        let instrucaoSql = `SELECT count(*) as 'qtd' FROM tbChamados WHERE MONTH(dataAbertura) = ${mes} and fkTorre = ${torre} and fkEmpresa = ${empresa} and estado = "${status}";`;
        console.log(instrucaoSql);

        sequelize
            .query(instrucaoSql, {
                model: Chamado,
            })
            .then((resultado) => {
                console.log(`Encontrados: ${resultado}`);
                res.json(resultado);
            })
            .catch((erro) => {
                console.error(erro);
                res.status(500).send(erro.message);
            });
    }
);

router.get(
    "/qtdChamadosTurno/:turno/:fkTorre/:fkEmpresa/:estado",
    function (req, res, next) {
        console.log("Recuperando numero de chamados por mês");
        let instrucaoSql;
        var torre = req.params.fkTorre;
        var empresa = req.params.fkEmpresa;
        var turno = req.params.turno;
        var status = req.params.estado;

        if (turno == 1) {
            instrucaoSql = `SELECT count(*) as 'qtd' FROM tbChamados WHERE fkEmpresa = ${empresa} AND fkTorre = ${torre} AND DATE_FORMAT(dataAbertura,'%H:%i:%S') BETWEEN '04:00:00' AND '11:59:00' and estado = "${status}";`;
        } else if (turno == 2) {
            instrucaoSql = `SELECT count(*) as 'qtd' FROM tbChamados WHERE fkEmpresa = ${empresa} AND fkTorre = ${torre} AND DATE_FORMAT(dataAbertura,'%H:%i:%S') BETWEEN '12:00:00' AND '17:59:00' and estado = "${status}";`;
        } else {
            instrucaoSql = `SELECT count(*) as 'qtd' FROM tbChamados WHERE fkEmpresa = ${empresa} AND fkTorre = ${torre} AND DATE_FORMAT(dataAbertura,'%H:%i:%S') BETWEEN '18:00:00' AND '03:59:00' and estado = "${status}";`;
        }

        console.log(instrucaoSql);

        sequelize
            .query(instrucaoSql, {
                model: Chamado,
            })
            .then((resultado) => {
                console.log(`Encontrados: ${resultado}`);
                res.json(resultado);
            })
            .catch((erro) => {
                console.error(erro);
                res.status(500).send(erro.message);
            });
    }
);

module.exports = router;
