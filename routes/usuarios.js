var express = require("express");
var router = express.Router();
var sequelize = require("../models/").Database1;
var sequelize2 = require("../models/").Database2;
var Usuario = require("../models").Usuario;
var Computador = require("../models").Computador;
var Torre = require("../models").Torre;
var Empresa = require("../models").Empresa;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post("/autenticar", function (req, res, next) {
    console.log("Recuperando usuário por login e senha");

    var login = req.body.email; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login

    let instrucaoSql = `select * from tbFuncionarios where email='${login}' and senha='${senha}'`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Usuario,
        })
        .then((resultado) => {
            console.log(`Encontrados: ${resultado.length}`);

            if (resultado.length == 1) {
                sessoes.push(resultado[0].dataValues.email);
                console.log("sessoes: ", sessoes);
                res.json(resultado[0]);
            } else if (resultado.length == 0) {
                res.status(403).send("Login e/ou senha inválido(s)");
            } else {
                res.status(403).send(
                    "Mais de um usuário com o mesmo login e senha!"
                );
            }
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

/* Cadastrar usuário */
router.post("/cadastrar", function (req, res, next) {
    console.log("Criando um usuário");

    let instrucaoSql = `INSERT INTO tbFuncionarios VALUES (${req.body.idFuncionario},${req.body.fkEmpresa},'${req.body.nome}','${req.body.sobrenome}','${req.body.email}','${req.body.senha}','${req.body.cargo}','${req.body.permissao}')`;

    sequelize
        .query(instrucaoSql, {
            model: Usuario,
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
            model: Usuario,
        })
        .then((resultado) => {
            console.log(`Registro criado: ${resultado}`);
            res.send(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

/* Verificação de usuário */
router.get("/sessao/:login", function (req, res, next) {
    let login = req.params.login;
    console.log(`Verificando se o usuário ${login} tem sessão`);

    let tem_sessao = false;
    for (let u = 0; u < sessoes.length; u++) {
        if (sessoes[u] == login) {
            tem_sessao = true;
            break;
        }
    }

    if (tem_sessao) {
        let mensagem = `Usuário ${login} possui sessão ativa!`;
        console.log(mensagem);
        res.send(mensagem);
    } else {
        res.sendStatus(403);
    }
});

/* Logoff de usuário */
router.get("/sair/:login", function (req, res, next) {
    let login = req.params.login;
    console.log(`Finalizando a sessão do usuário ${login}`);
    let nova_sessoes = [];
    for (let u = 0; u < sessoes.length; u++) {
        if (sessoes[u] != login) {
            nova_sessoes.push(sessoes[u]);
        }
    }
    sessoes = nova_sessoes;
    res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});

/* Recuperar todos os usuários */
router.get("/", function (req, res, next) {
    console.log("Recuperando todos os usuários");
    Usuario.findAndCountAll()
        .then((resultado) => {
            console.log(`${resultado.count} registros`);

            res.json(resultado.rows);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

/* Cadastrar maquina */
router.post("/cadastrarComputador/:fkEmpresa", function (req, res, next) {
    console.log("Criando um computador");

    let instrucaoSql = `INSERT INTO tbComputadores VALUES (${req.body.idComputador}, ${req.params.fkEmpresa}, ${req.body.torre}, '${req.body.name_marca}', '${req.body.name_modelo}', '${req.body.name_nmr_serie}', '${req.body.name_cpu}', ${req.body.name_mem_ram}, ${req.body.name_disco})`;

    sequelize
        .query(instrucaoSql, {
            model: Computador,
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
            model: Computador,
        })
        .then((resultado) => {
            console.log(`Registro criado: ${resultado}`);
            res.send(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

/* Cadastrar torre */
router.post("/cadastrarTorre/", function (req, res, next) {
    console.log("Criando uma torre");

    let instrucaoSql = `INSERT tbTorres VALUES (${req.body.idTorre}, ${req.body.empresa}, '${req.body.name_torre}', '${req.body.name_endereco}', '${req.body.name_numero}', '${req.body.name_cidade}', '${req.body.name_estado}')`;

    // Torre.create({
    //     idTorre: req.body.idTorre,
    //     nomeTorre: req.body.name_torre,
    //     logradouroTorre: req.body.name_endereco,
    //     numeroTorre: req.body.name_numero,
    //     cidadeTorre: req.body.name_cidade,
    //     estadoTorre: req.body.name_estado,
    //     fkEmpresa: req.body.empresa,
    // })
    sequelize
        .query(instrucaoSql, {
            model: Torre,
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
            model: Torre,
        })
        .then((resultado) => {
            console.log(`Registro criado: ${resultado}`);
            res.send(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

/* Cadastrar Empresa */
router.post("/cadastrarEmpresa/", function (req, res, next) {
    console.log("Criando uma Empresa");

    let instrucaoSql = `INSERT INTO tbEmpresas (nomeEmpresa, cnpj, telefoneFixo, cep, logradouro, numeroEndereco, cidadeEmpresa, estadoEmpresa) VALUES ('${req.body.nome_empresa}','${req.body.cnpj}','${req.body.telefone}','${req.body.cep}','${req.body.logradouro}',${req.body.numero},'${req.body.cidade}','${req.body.estado}')`;

    // Empresa.create({
    //     nomeEmpresa: req.body.nome_empresa,
    //     cnpj: req.body.cnpj,
    //     telefoneFixo: req.body.telefone,
    //     cep: req.body.cep,
    //     logradouro: req.body.logradouro,
    //     numeroEndereco: req.body.numero,
    //     cidadeEmpresa: req.body.cidade,
    //     estadoEmpresa: req.body.estado,
    // })
    sequelize
        .query(instrucaoSql, {
            model: Empresa,
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
            model: Empresa,
        })
        .then((resultado) => {
            console.log(`Registro criado: ${resultado}`);
            res.send(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

/* Recupera o valor de computadores cadastrados por torre */
router.get("/idComputador/:torre", function (req, res, next) {
    console.log("Recuperando numero de computadores");

    var torre = req.params.torre;

    let instrucaoSql = `select count(*) as "ids" from tbComputadores where fktorre = ${torre};`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Computador,
        })
        .then((resultado) => {
            console.log(`Encontrados: ${resultado}`);
            res.json(resultado);
        })
        .catch((erro) => {
            console.error(erro);
            res.status(500).send(erro.message);
        });

    sequelize2
        .query(instrucaoSql, {
            model: Computador,
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

/* Recupera o valor de funcionarios cadastrados por empresa */
router.get("/qtdFuncionario/:fkEmpresa", function (req, res, next) {
    console.log("Recuperando numero de computadores");

    var fkEmpresa = req.params.fkEmpresa;

    let instrucaoSql = `select count(*) as "ids" from tbFuncionarios where fkEmpresa = ${fkEmpresa};`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Computador,
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

/* Recupera as torre cadastradas por empresa */
router.get("/qtdTorres/:fkEmpresa", function (req, res, next) {
    console.log("Recuperando numero de computadores");

    var fkEmpresa = req.params.fkEmpresa;

    let instrucaoSql = `SELECT * FROM tbTorres WHERE fkEmpresa = ${fkEmpresa};`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Torre,
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

/* Recupera computadores por empresa */
router.get("/qtdComputadores/:fkEmpresa", function (req, res, next) {
    console.log("Recuperando numero de computadores");

    var fkEmpresa = req.params.fkEmpresa;

    let instrucaoSql = `SELECT * from tbComputadores JOIN tbTorres ON tbComputadores.fkEmpresa = tbTorres.fkEmpresa AND  tbComputadores.fkTorre = tbTorres.idTorre WHERE tbComputadores.fkEmpresa = ${fkEmpresa} order by tbComputadores.fkTorre;`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Torre,
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

/* Recupera torres por empresa */
router.get("/qtdTorres_e/:fkEmpresa", function (req, res, next) {
    console.log("Recuperando numero de torres");

    var fkEmpresa = req.params.fkEmpresa;

    let instrucaoSql = `SELECT count(*) as 'torres' from tbTorres where fkEmpresa = ${fkEmpresa};`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Torre,
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

/* Recupera computadores por empresa */
router.get("/qtdEmpresas", function (req, res, next) {
    console.log("Recuperando numero de computadores");

    let instrucaoSql = `SELECT * from tbEmpresas`;
    console.log(instrucaoSql);

    sequelize
        .query(instrucaoSql, {
            model: Torre,
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

module.exports = router;
