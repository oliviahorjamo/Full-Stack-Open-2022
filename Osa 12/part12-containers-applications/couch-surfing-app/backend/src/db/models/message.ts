'use strict';
import {
  Model,
} from 'sequelize';

interface MessageAttributes {
  id: number,
  sentBy: String,
  sentTo: String
  text: String,
  sentAt: Date,
  readAt: Date
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Message extends Model<MessageAttributes>
    implements MessageAttributes {

      id!: number;
      sentBy!: String;
      sentTo!: String;
      text!: String;
      sentAt!: Date;
      readAt!: Date;
    
    static associate(models: any) {
      // define association here
      Message.belongsTo(models.User,
        { 
          as: 'sender',
          foreignKey: 'sentBy'
        });

      Message.belongsTo(models.User,
        { 
          as: 'receiver',
          foreignKey: 'sentTo'
        });

    }
  }

  Message.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    sentBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    sentTo: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sentAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    readAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Message',
    timestamps: true,
    createdAt: 'sentAt',
    updatedAt: false
  });
  return Message;
};