require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {

  it('Testando se fetchItem é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });
  it('Testando chamada da função fetch', async () => {
    const result = await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Testando o argumento da função fetch', async  () => {
    const result = await fetchItem('MLB1615760527')
    const url = "https://api.mercadolibre.com/items/MLB1615760527"
    expect(fetch).toHaveBeenCalledWith(url);
  });
  it('Testando o retorno da função fetchItem', async () => {
    const result = await fetchItem('MLB1615760527')
    expect(result).toEqual(item);
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
