'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Chamado = sequelize.define('Chamado',{
			idChamado: {
				field: 'idChamado',
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
        fkEmpresa: {
			field: 'fkEmpresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: false
		},	
		descricao: {
			field: 'descricao',
			type: DataTypes.STRING,
			allowNull: false
		},
		dataAbertura: {
			field: 'dataAbertura',
			type: DataTypes.DATE,
			allowNull: false
		},
		dataConclusao: {
			field: 'dataConclusao',
			type: DataTypes.STRING,
			allowNull: true
		},
		estado: {
			field: 'estado',
			type: DataTypes.STRING,
			allowNull: false
		}
		
	}, 
	{
		tableName: 'tbChamados', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Chamado;
};
