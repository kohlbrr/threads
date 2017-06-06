/* eslint-disable no-console */

const faker = require('faker');
const {
  User,
  Product,
  Design,
  Clothing,
  Category,
  Review,
} = require('./db/models');
const db = require('./db');

faker.seed(123);


const amountOfUsers = 20;
const amountOfDesigns = 40;
const amountOfProducts = 300;
const amountOfReviews = 50;

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

function getCollectionOfReviews(n){
  const reviews = [];
  while (n) {
    reviews.push(createReview());
    n -= 1;
  }
  return reviews;
}
function createData() {
  Clothing.create({
    name: 'Shirts',
  })
  .then(() => 'Clothing Created')
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
  .then(() => User.create({
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'pass123',
    isAdmin: true,
  }))
  .then(() => User.create({
    name: 'Not Admin',
    email: 'notadmin@admin.com',
    password: 'pass123',
    isAdmin: false,
  }));
}


db.sync({ force: true })
.then(() => createData());
