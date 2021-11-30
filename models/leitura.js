'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Leitura = sequelize.define('Leitura',{	
		id: {
			field: 'idCapturaDeDado',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		fkComputador: {
			field: 'fkComputador',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
		fkTorre: {
			field: 'fkTorre',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
		usuarioMaq: {
			field: 'usuarioMaq',
			type: DataTypes.STRING,
			allowNull: false
		},
		cpuPorcentual: {
			field: 'cpuPorcentual',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		ramPorcentual: {
			field: 'ramPorcentual',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		discoPorcentual: {
			field: 'discoPorcentual',
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		internet: {
			field: 'internet',
			type: DataTypes.STRING,
			allowNull: false
		},
		dataHora: {
			field: 'dataHora',
			type: DataTypes.DATE, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
		momento_grafico: {
			type: DataTypes.VIRTUAL, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
			allowNull: true
		}
	}, 
	{
		tableName: 'tbcapturadedados', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Leitura;
};
