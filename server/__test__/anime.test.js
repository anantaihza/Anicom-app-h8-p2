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

describe('Test 3rd Party API Jikan', () => {
  test('Should show anime list', async () => {
    const response = await request(app)
      .get('/anime-list')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("pagination", expect.any(Object))
    expect(response.body).toHaveProperty("data", expect.any(Array))
    expect(response.body.data[0]).toHaveProperty("mal_id", expect.any(Number))
  });

  test('Should show error anime list when token invalid', async () => {
    const response = await request(app)
      .get('/anime-list')
      .set('Authorization', 'Bearer ' + "sdjfs");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String))
  });

  test('Should show anime detail', async () => {
    const response = await request(app)
      .get('/anime-list/52991')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("data", expect.any(Object))
    expect(response.body.data).toHaveProperty("mal_id", expect.any(Number))
  });

  test('Should show error anime detail when token is invalid', async () => {
    const response = await request(app)
      .get('/anime-list/52991')
      .set('Authorization', 'Bearer ' + "sdfsfg");

      expect(response.status).toBe(401);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", expect.any(String))
  });

  test('Should show anime list Character', async () => {
    const response = await request(app)
      .get('/anime-list/characters')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("pagination", expect.any(Object))
    expect(response.body).toHaveProperty("data", expect.any(Array))
    expect(response.body.data[0]).toHaveProperty("mal_id", expect.any(Number))
  });

  // test('Should show anime list Character by id', async () => {
  //   const response = await request(app)
  //     .get('/anime-list/52991/character')
  //     .set('Authorization', 'Bearer ' + token);

  //     console.log(response)
  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toHaveProperty("data", expect.any(Array))
  // });

  // test('Should show anime Statistics', async () => {
  //   const response = await request(app)
  //     .get('/anime-list/52991/statistics')
  //     .set('Authorization', 'Bearer ' + token);

  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body).toHaveProperty("data", expect.any(Object))
  // });
});
