
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Kekov',
      token: 'gdfkgjdfkjgldfjg343454534jl',
      password: bcrypt.hashSync('1111111', bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      username: 'SpainWolf',
      password: bcrypt.hashSync('1111111', bcrypt.genSaltSync(8)),
      token: "dhj5344h45j324j4fsfd3",
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      username: 'SomeUser',
      token: '243432wefddsf3',
      password: bcrypt.hashSync('1111111', bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
  },
};
