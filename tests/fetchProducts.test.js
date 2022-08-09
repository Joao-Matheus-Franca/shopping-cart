require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Testes da função fetchProducts', async () => {
  const result = await fetchProducts('computador');
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  expect(typeof fetchProducts).toEqual('function');
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(url);
  expect(result).toEqual(computadorSearch);
  expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  })
});
