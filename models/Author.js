const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// class Author extends Model {
//   checkPassword(loginPw) {
//     const decryptedPassword = decrypt(this.password);
//     const result = bcrypt.compareSync(loginPw, decryptedPassword);
//     console.log(`Result of comparison: ${result}`);
//     return result;
//   }
// }

class Author extends Model {
  checkPassword(loginPw) {
    const result = bcrypt.compareSync(loginPw, this.password);
    console.log(`Result of comparison: ${result}`);
    return result;
  }
}

// When a user logs in, they usually provide an unhashed password. The stored password in the database, however, is hashed for security reasons. So, we need to compare the hashed password in the database with the unhashed password provided by the user.
// Decrypting the hashed password in the database is not possible because it is a one-way process. Instead, we use a hashing algorithm to hash the unhashed password provided by the user and then compare the resulting hash with the hash stored in the database. If the hashes match, the password is correct.
// But does hashing the same password always produce the same encrypted string?
// Yes, hashing the same password using the same hashing algorithm always produces the same output. This property of hash functions is called determinism. This means that if two users have the same password, their hashed passwords will be identical, and the server can use this property to verify if the passwords match without storing the original password in plaintext.

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    password: {
    type: DataTypes.STRING(1000),
    allowNull: false,
    },
  },
  {
    hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        },
      },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'author'
  }
);




module.exports = Author;
