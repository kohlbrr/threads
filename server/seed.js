/* eslint-disable no-console */

let faker = require('faker');
const {
  User,
  Product,
  Design,
  Clothing,
  Category,
  Review,
  Order,
  OrderProducts,
} = require('./db/models');
const db = require('./db');

faker.seed(123);


const amountOfUsers = 20;
const amountOfDesigns = 40;
const amountOfProducts = 300;
const amountOfReviews = 50;
const amountOfOrders = 20;

function getAddress() {
  return `${faker.address.streetAddress()}, ${faker.address.city()} ${faker.address.zipCode()}`;
}

function createUser() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: getAddress(),
    isAdmin: false,
    password: faker.internet.password(),
  };
}


function getCollectionOfUsers(n) {
  const users = [];
  while (n) {
    users.push(createUser());
    n -= 1;
  }
  return users;
}

function createProduct() {
  return {
    size: faker.random.arrayElement(['XS', 'S', 'M', 'L', 'XL']),
    color: faker.commerce.color(),
    stock: Math.floor(Math.random() * 100),
    imageUrl: faker.image.fashion(),
    designId: Math.ceil(Math.random() * amountOfDesigns),
  };
}

function getCollectionOfProducts(n) {
  const products = [];
  while (n) {
    products.push(createProduct());
    n -= 1;
  }
  return products;
}

function createDesign() {
  return {
    name: faker.commerce.productName(),
    sex: faker.random.arrayElement(['F', 'M']),
    price: Math.ceil(Math.random() * 9000) + 1000,
    clothingId: 1,
    categoryId: Math.ceil(Math.random() * 3),
  };
}

function getCollectionOfDesigns(n) {
  const designs = [];
  while (n) {
    designs.push(createDesign());
    n -= 1;
  }
  return designs;
}

const categories = [
  { name: 'Graphic Tees', clothingId: 1 },
  { name: 'Polo', clothingId: 1 },
  { name: 'Tank Top', clothingId: 1 },
];



function createReview() {
  return {
    stars: Math.ceil(Math.random() * 5),
    content: faker.hacker.phrase(),
    userId: Math.ceil(Math.random() * amountOfUsers),
    designId: Math.ceil(Math.random() * amountOfDesigns),
  };
}

function getCollectionOfReviews(n) {
  const reviews = [];
  while (n) {
    reviews.push(createReview());
    n -= 1;
  }
  return reviews;
}


function createOrder() {
  return {
    status: faker.random.arrayElement(['Shipped', 'Delivered', 'Canceled']),
    timestamp: faker.date.past(),
    userId: Math.ceil(Math.random() * amountOfUsers),
  };
}

function getCollectionOfOrders(n) {
  const orders = [];
  while (n) {
    orders.push(createOrder());
    n -= 1;
  }
  return orders;
}

function createOrderProducts() {
  return {
    quantity: Math.ceil(Math.random() * 3),
    price: Math.ceil(Math.random() * 9000) + 1000,
    productId: Math.ceil(Math.random() * amountOfProducts),
    orderId: Math.ceil(Math.random() * amountOfOrders),
  };
}

function getCollectionOfOrderProducts(n) {
  const orderProducts = [];
  while (n) {
    orderProducts.push(createOrderProducts());
    n -= 1;
  }
  return orderProducts;
}

function createData() {
  db.sync({ force: true })
  .then(() => Clothing.create({
    name: 'Shirts',
  }))
  .then(() => console.log('Clothing Created'))
  .then(() => Category.bulkCreate(categories))
  .then(() => console.log('Categories created'))
  .then(() => User.bulkCreate(getCollectionOfUsers(amountOfUsers)))
  .then(() => console.log('Users created'))
  .then(() => Design.bulkCreate(getCollectionOfDesigns(amountOfDesigns)))
  .then(() => console.log('Designs Created'))
  .then(() => Product.bulkCreate(getCollectionOfProducts(amountOfProducts)))
  .then(() => console.log('Products created'))
  .then(() => Review.bulkCreate(getCollectionOfReviews(amountOfReviews)))
  .then(() => console.log('Reviews created'))
  .then(() => Order.bulkCreate(getCollectionOfOrders(amountOfOrders)))
  .then(() => console.log('Orders created'))
  .then(() => OrderProducts.bulkCreate(getCollectionOfOrderProducts(100)))
  .then(() => console.log('Created OrderProducts'))
  .then(() => User.create({
    email: 'admin@admin.com',
    password: 'pass123',
    isAdmin: true,
  }))
  .then(() => User.create({
    email: 'notadmin@admin.com',
    password: 'pass123',
    isAdmin: false,
  }))
  .catch(console.log);
}


db.sync({ force: true })
.then(() => createData());
