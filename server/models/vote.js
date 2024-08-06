'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vote.belongsTo(models.User)
      Vote.belongsTo(models.Anime)
    }
  }
  Vote.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "UserId is required"
        },
        notEmpty: {
          msg: "UserId is required"
        }
      }
    },
    AnimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "AnimeId is required"
        },
        notEmpty: {
          msg: "AnimeId is required"
        }
      }
    },
    voteType: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Vote Type is required"
        },
        notEmpty: {
          msg: "Vote Type is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Vote',
  });
  return Vote;
};