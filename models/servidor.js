'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Servidor = sequelize.define('Servidor',{
		idDadoServidor: {
			field: 'idDadoServidor',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
			},	
        cpuPorcentual: {
			field: 'cpuPorcentual',
			type: DataTypes.DECIMAL(5,2),
			allowNull: false
		},        
		ramPorcentual: {
			field: 'ramPorcentual',
			type: DataTypes.DECIMAL(5,2),
			allowNull: false
		},
		discoPorcentual: {
			field: 'discoPorcentual',
			type: DataTypes.DECIMAL(5,2),
			allowNull: false
		},
		dataHora: {
			field: 'dataHora',
			type: DataTypes.DATE,
			allowNull: false
		},
		localizacao: {
			field: 'localizacao',
			type: DataTypes.DATE,
			allowNull: false
		}
		
	}, 
	{
		tableName: 'tbDadosServidor', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Servidor;
};
