module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Email must be unique',
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        max: {
          msg: 'Password must contain maximum of 25 characteres',
          args: 25,
        },
        min: {
          msg: 'Password must contain minimum of 6 characteres',
          args: 6,
        },
      },
      allowNull: false,
    },
  });

  return User;
};
