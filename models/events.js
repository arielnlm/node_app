'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
      //this.hasMany(Users, { foreignKey: 'eventId', as: 'event', onDelete: 'cascade', hooks: true });
    }
  };
  Events.init({
    name: DataTypes.STRING,
    host: DataTypes.STRING,
    description: DataTypes.STRING,
    guests: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'Events',
  });
  return Events;
};