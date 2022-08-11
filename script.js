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

const count = createCustomElement('p', 'total-price', 0);
const bigFather = document.querySelector('.cart');
bigFather.appendChild(count);

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

const car = document.querySelector('.cart__items');

const cartItemClickListener = (event) => {
  const father = event.target.parentNode;
  father.removeChild(event.target);
  const text = event.target.innerText;
  const price = text.split('|')[2].split(' ')[2].replace('$', '');
  const removeItem = Number(count.innerText) - Number(price);
  count.innerHTML = removeItem;
  saveCartItems(car.innerHTML);
};

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
  const saved = createCartItemElement(object);
  car.appendChild(saved);
  saveCartItems(car.innerHTML);
  const totalPrice = Number(count.innerText) + price;
  console.log(totalPrice);
  count.innerText = totalPrice;
  return object;
};

const addItens = async () => {
  const load = document.createElement('p');
  load.className = 'loading';
  load.innerText = 'carregando...';
  itens.appendChild(load);
  const produtos = await fetchProducts('computador');
  const modder = produtos.results.map((e) => ({ sku: e.id, name: e.title, image: e.thumbnail }));
  modder.forEach((e) => itens.appendChild(createProductItemElement(e)));
  itens.removeChild(load);
  const buttonAdd = document.querySelectorAll('.item__add');
  buttonAdd.forEach((b) => b.addEventListener('click', addCart));
};

addItens();

const clearButton = document.querySelector('.empty-cart');
clearButton.addEventListener('click', () => {
  car.innerHTML = '';
  saveCartItems(car.innerHTML);
});

window.onload = () => { 
  const saved = getSavedCartItems();
  car.innerHTML = saved;
  const children = document.querySelectorAll('.cart__item');
  children.forEach((c) => c.addEventListener('click', cartItemClickListener));
};
