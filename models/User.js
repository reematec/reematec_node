const Sequelize = require("sequelize");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const sequelize = require("../utils/sequelizeCN");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  identifier: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  googleId: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  displayName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  firstname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: Sequelize.DataTypes.STRING,
  },
  // Roles types are given at time of signup post action
  role: {
    type: Sequelize.DataTypes.STRING,
  },
  token: {
    type: Sequelize.DataTypes.STRING,
    allowNull: true,
  },
  verified: {
    type: Sequelize.DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  active: {
    type: Sequelize.DataTypes.BOOLEAN,
    defaultValue: true,
  },
  expiresIn: {
    type: Sequelize.DataTypes.DATE,
  },
});

User.beforeCreate(async (user, options) => {
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
});

User.afterSave(async function (user, options) {
  // console.log('new user was created & saved', user)
});
sequelize.sync();
// User.sync(
//     // { force: true }
//     // { alter: true }
// )

User.login = async function (email, password, done) {
  const user = await User.findOne({ where: { email } });

  if (!user) return done(null, false, { message: "Email or Password is not correct" });
  if (!user.active) return done(null, false, { message: "Unverified Account" });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) return done(null, user);

    // Incorrect PW
    return done(null, false, { message: "Password or Email is not correct" });
  }
  // incorrect Email
  return done(null, false, { message: "Email or Password is not correct" });
};

module.exports = User;
