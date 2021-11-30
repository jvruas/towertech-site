'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Empresa = sequelize.define('Empresa',{
		idEmpresa: {
			field: 'idEmpresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nomeEmpresa: {
			field: 'nomeEmpresa',
			type: DataTypes.STRING,
			allowNull: false
		},
		cnpj: {
			field: 'cnpj',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefoneFixo: {
			field: 'telefoneFixo',
			type: DataTypes.STRING,
			allowNull: false
		},
		cep: {
			field: 'cep',
			type: DataTypes.STRING,
			allowNull: false
		},
		logradouro: {
			field: 'logradouro',
			type: DataTypes.STRING,
			allowNull: false
		},
        numeroEndereco: {
			field: 'numeroEndereco',
			type: DataTypes.INTEGER,
			allowNull: false
		},
        cidadeEmpresa: {
			field: 'cidadeEmpresa',
			type: DataTypes.STRING,
			allowNull: false
		},
		estadoEmpresa: {
			field: 'estadoEmpresa',
			type: DataTypes.INTEGER,
			allowNull: false
		}
		
	}, 
	{
		tableName: 'tbEmpresas', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Empresa;
};
