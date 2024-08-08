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

    let anime = [
      {
        mal_id: 1,
        imageUrl:
          'https://i.pinimg.com/736x/28/7c/b5/287cb5bee3282583abe7836cc2f15465.jpg',
        title: 'test',
        episodes: 10,
        status: 'ongoing',
        score: 8.5,
        studios: 'kapa',
        synopsis: 'lorem ipsum',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    let subscribe = [
      {
        UserId: 1,
        AnimeId: 1,
        watched: false,
        voteType: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});
    await queryInterface.bulkInsert('Animes', anime, {});
    await queryInterface.bulkInsert('Subscribes', subscribe, {});

    token = signToken({ id: 1 });
  } catch (error) {
    console.log(error, '<- Error beforeAll');
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete(
      'Subscribes',
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    );
    await queryInterface.bulkDelete(
      'Animes',
      {},
      {
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }
    );
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

describe('Test Subscribe', () => {
  test('Should show anime subscribe', async () => {
    const response = await request(app)
      .get('/subscribe')
      .set('Authorization', 'Bearer ' + token);

    console.log(response);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toHaveProperty('mal_id', expect.any(Number));
    expect(response.body[0]).toHaveProperty('imageUrl', expect.any(String));
    expect(response.body[0]).toHaveProperty('title', expect.any(String));
    expect(response.body[0]).toHaveProperty('episodes', expect.any(Number));
  });

  test('Should create subscribe', async () => {
    const response = await request(app)
      .post('/subscribe')
      .set('Authorization', 'Bearer ' + token)
      .send({
        mal_id: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', expect.any(String));
    expect(response.body).toHaveProperty('result', expect.any(Object));
  });

  test('Should error create subscribe because not sending data', async () => {
    const response = await request(app)
      .post('/subscribe')
      .set('Authorization', 'Bearer ' + token)
      
    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', "Request failed with status code 404");
  });

  test('Should update subscribe', async () => {
    const response = await request(app)
      .patch('/subscribe/1')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      'message',
      'Success to update status'
    );
  });

  test('Should up vote subscribe', async () => {
    const response = await request(app)
      .patch('/subscribe/1/up-vote')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      'message',
      'Success to up vote'
    );
  });

  test('Should neutral vote subscribe', async () => {
    const response = await request(app)
      .patch('/subscribe/1/neutral-vote')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      'message',
      'Success to neutral vote'
    );
  });
  test('Should down vote subscribe', async () => {
    const response = await request(app)
      .patch('/subscribe/1/down-vote')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      'message',
      'Success to down vote'
    );
  });

  test('Should delete subscribe', async () => {
    const response = await request(app)
      .delete('/subscribe/1')
      .set('Authorization', 'Bearer ' + token);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      'message',
      'Success to delete Subscribe'
    );
  });
});
