require('dotenv').config();

module.exports = {
  schemas: {
    default: {
      engineKey: process.env.ENGINE_KEY,
    },
  },
};
