'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({ Post }) {
            // define association here
            this.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
        }
        toJSON() {
            return {...this.get(), id: undefined } //hide id
        }
    };
    User.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            Validate: {
                notNull: { msg: "Name must not be null" },
                notEmpty: { msg: "Name must not be empty" }
            }
        },
        email: {
            type: DataTypes.STRING,
            Validate: {
                notNull: { msg: "Name must not be null" },
                notEmpty: { msg: "Name must not be empty" },
                isEmail: { msg: "Email format must be true" }
            }
        }
    }, {
        sequelize,
        tableName: "users",
        modelName: 'User',
    });
    return User;
};