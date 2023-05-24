'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gamil.com',
      password: '123456',
      firstName: 'John',
      lastName: 'Doe',
      address: 'Viet Nam',
      gender: 1,
      // roleId: DataTypes.STRING,
      // phonenumber: DataTypes.STRING,
      // positionId: DataTypes.STRING,
      // image: DataTypes.STRING,
      createdAt: new Date(),
      updatedAt: new Date() 
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
