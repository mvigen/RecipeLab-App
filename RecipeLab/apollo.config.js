module.exports = {
  client: {
    includes: ['src//*.tsx', 'src//*.ts'],
    service: {
      name: 'RecipeLab',
      url: 'http://localhost:5000/graphql',
    },
  },
};
