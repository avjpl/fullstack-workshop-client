require('dotenv').config();

module.exports = {
  schemas: {
    default: {
      engineKey: process.env.ENGINE_KEY,
    },
  },
  clientSchema: './src/schema.js',
};
