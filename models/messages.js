'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Users }) {
      // define association here
      this.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
    }
  };
  Messages.init({
    body: {
      type: DataTypes.STRING(2048),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};