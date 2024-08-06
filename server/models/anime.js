'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.belongsToMany(models.User, { through: models.Subscribe });
      Anime.hasMany(models.Subscribe);
    }
  }
  Anime.init(
    {
      mal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Anime id is required',
          },
          notEmpty: {
            msg: 'Anime id is required',
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Image Url is required',
          },
          notEmpty: {
            msg: 'Image Url is required',
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title is required',
          },
          notEmpty: {
            msg: 'Title is required',
          },
        },
      },
      episodes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Episodes is required',
          },
          notEmpty: {
            msg: 'Episodes is required',
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Status is required',
          },
          notEmpty: {
            msg: 'Status is required',
          },
        },
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Score is required',
          },
          notEmpty: {
            msg: 'Score is required',
          },
        },
      },
      studios: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Studios is required',
          },
          notEmpty: {
            msg: 'Studios is required',
          },
        },
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Synopsys is required',
          },
          notEmpty: {
            msg: 'Synopsys is required',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Anime',
    }
  );
  return Anime;
};
