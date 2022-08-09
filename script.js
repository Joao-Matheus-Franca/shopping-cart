const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const itens = document.querySelector('.items');

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
};

const car = document.querySelector('.cart__items');

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addCart = async (event) => {
  const ids = getSkuFromProductItem(event.target.parentNode);
  const item = await fetchItem(ids);
  const { id, title, price } = item;
  const object = { sku: id, name: title, salePrice: price };
  car.appendChild(createCartItemElement(object));
  return object;
};

const addItens = async () => {
  const produtos = await fetchProducts('computador');
  const modder = produtos.results.map((e) => ({ sku: e.id, name: e.title, image: e.thumbnail }));
  modder.forEach((e) => itens.appendChild(createProductItemElement(e)));
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((b) => b.addEventListener('click', addCart));
};

addItens();

window.onload = () => { };
