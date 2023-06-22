'use strict';
import {
  Model,
  Optional,
  DataTypes
} from 'sequelize';

import sequelizeConnection from '../config';

interface PublicationAttributes {
  id: number,
  createdBy: String,
  title: String,
  message: String,
  createdAt?: Date,
  updatedAt?: Date
}

export interface PublicationInput extends Optional<PublicationAttributes, 'id'>{}

class Publication extends Model<PublicationAttributes, PublicationInput>
  implements PublicationAttributes {
  
    id!: number;
    createdBy!: string;
    title!: string;
    message!: String;
    createdAt?: Date;
    updatedAt?: Date;

  
  static associate(models: any) {
    // define association here
    Publication.belongsTo(models.User,
      { foreignKey: 'createdBy' });
  }
}

Publication.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: sequelizeConnection,
  modelName: 'Publication',
  timestamps: true
});

export default Publication;