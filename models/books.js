'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
     // this.belongsToMany(Users, {through: 'UserBook', foreignKey: 'bookId', otherKey: 'userId'});
     this.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
    }
  };
  Books.init({
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Books',
  });
  return Books;
};