const request = require('supertest');
const app = require('../app');

const { sequelize } = require('../models/index');
const { queryInterface } = sequelize;
const { hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

let token;
beforeAll(async () => {
  try {
    let users = [
      {
        fullName: 'user1',
        email: 'user1@mail.com',
        password: hashPassword('1234'),
        subscription: 'Free',
        imageUrl:
          'https://i.pinimg.com/736x/28/7c/b5/287cb5bee3282583abe7836cc2f15465.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});

    token = signToken({ id: 1 });
  } catch (error) {
    console.log(error, '<- Error beforeAll');
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete(
      'Users',
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    );
  } catch (error) {
    console.log(error, '<- Error afterAll');
  }
});

describe('Test Auth', () => {
  test('Should register', async () => {
    const response = await request(app).post('/register').send({
      fullName: 'ananta',
      email: 'ananta@mail.com',
      password: '1234',
    });

    // console.log(response);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('fullName', expect.any(String));
    expect(response.body).toHaveProperty('email', expect.any(String));
  });

  test('Should show error register', async () => {
    const response = await request(app).post('/register');

    // console.log(response);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', expect.any(Array));
  });

  test('Should login', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: "ananta@mail.com",
        password: "1234"
      });

    // console.log(response);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('access_token', expect.any(String));
  });

  test('Should login error', async () => {
    const response = await request(app)
      .post('/login')

    console.log(response);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', "Email / Password is required");
  });

  test('get User', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Authorization', 'Bearer ' + token)

    // console.log(response);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('fullName', expect.any(String));
    expect(response.body).toHaveProperty('email', expect.any(String));
    expect(response.body).toHaveProperty('subscription', expect.any(String));
    expect(response.body).toHaveProperty('imageUrl', expect.any(String));
  });

  test('get User show error', async () => {
    const response = await request(app)
      .get('/profile')

    // console.log(response);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', "Invalid token");
  });

  


});
