'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Computador = sequelize.define('Computador',{
		idComputador: {
			field: 'idComputador',
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
		fkEmpresa: {
			field: 'fkEmpresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},
		marca: {
			field: 'marca',
			type: DataTypes.STRING,
			allowNull: false
		},
		modelo: {
			field: 'modelo',
			type: DataTypes.STRING,
			allowNull: false
		},
		numeroSerie: {
			field: 'numeroSerie',
			type: DataTypes.STRING,
			allowNull: false
		},
		processador: {
			field: 'processador',
			type: DataTypes.STRING,
			allowNull: false
		},
		capacidadeRam: {
			field: 'capacidadeRam',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		capacidadeDisco: {
			field: 'capacidadeDisco',
			type: DataTypes.INTEGER,
			allowNull: false
		}
		
	}, 
	{
		tableName: 'tbComputadores', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Computador;
};
