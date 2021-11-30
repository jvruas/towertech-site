'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Torre = sequelize.define('Torre',{
		idTorre: {
			field: 'idTorre',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},		
		nomeTorre: {
			field: 'nomeTorre',
			type: DataTypes.STRING,
			allowNull: false
		},
		logradouroTorre: {
			field: 'logradouroTorre',
			type: DataTypes.STRING,
			allowNull: false
		},
		numeroTorre: {
			field: 'numeroTorre',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		cidadeTorre: {
			field: 'cidadeTorre',
			type: DataTypes.STRING,
			allowNull: false
		},
		estadoTorre: {
			field: 'estadoTorre',
			type: DataTypes.STRING,
			allowNull: false
		},
		fkEmpresa: {
			field: 'fkEmpresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		}
		
	}, 
	{
		tableName: 'tbTorres', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Torre;
};
