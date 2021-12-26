'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('users', [{
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            uuid: '123e4567-e89b-12d3-a456-426614174000',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            name: 'Jane Doe',
            email: 'jane@gmail.com',
            uuid: '123e4567-e89b-12d3-a456-426614174110',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('users', null, {});
    }
};