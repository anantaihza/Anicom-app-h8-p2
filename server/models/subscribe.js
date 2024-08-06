'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Subscribe.belongsTo(models.User);
      Subscribe.belongsTo(models.Anime);
    }
  }
  Subscribe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'UserId is required',
          },
          notEmpty: {
            msg: 'UserId is required',
          },
        },
      },
      AnimeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'AnimeId is required',
          },
          notEmpty: {
            msg: 'AnimeId is required',
          },
        },
      },
      watched: DataTypes.BOOLEAN,
      voteType: DataTypes.INTEGER,
    },
    {
      hooks: {
        beforeCreate: (instance) => {
          instance.watched = false;
          instance.voteType = 0;
        },
      },
      sequelize,
      modelName: 'Subscribe',
    }
  );
  return Subscribe;
};
