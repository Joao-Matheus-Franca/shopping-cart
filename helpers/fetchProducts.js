// const fetch = require('node-fetch');

const fetchProducts = async (name) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${name}`;
  const computer = await fetch(url)
  .then((response) => response.json())
  .catch(() => new Error('You must provide an url'));
  return computer;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
