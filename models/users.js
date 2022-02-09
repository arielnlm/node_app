'use strict';
const {
  Model
} = require('sequelize');
const events = require('./events');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Messages, Books }) {
      // define association here
      this.hasMany(Messages, { foreignKey: 'userId', as: 'messages', onDelete: 'cascade', hooks: true });
      this.hasMany(Books, {foreignKey: 'userId', as: 'user', onDelete: 'cascade', hooks: true});
      //this.belongsTo(Events, {foreignKey: 'eventId', as: 'event', onDelete: 'cascade', hooks: true});
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    mod: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    defaultScope: {
      attributes: { },
    },
    modelName: 'Users',
  });
  return Users;
};