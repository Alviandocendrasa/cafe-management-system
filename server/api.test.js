const chai = require('chai');
const supertest = require('supertest');
const app = require("./index");
const mongoose = require('mongoose');

const expect = chai.expect;

const api = supertest(app);

describe('API Tests', () => {
  mongoose.set('debug', false);

  // Assuming you have a valid JWT token
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTU5N2VmNzVlMTlkOTgxYmUxYWQxYiIsImlhdCI6MTcwMDExOTA1MSwiZXhwIjoxNzAwNzIzODUxfQ.fq7cc4oHo63UIZHpFTjd_vkJmU_tFJzDwDw7cQTbjqs';

  it('Cafe owner login', async () => {
    const postData = {
      username: 'JanisRyan',
      password: '123',
    };

    const response = await api
      .post('/api/auth/login/')
      .send(postData);

    expect(response.status).to.equal(200);
  });

  it('Cafe owner create workslot', async () => {
    const postData = {
      "pendingJob": ["chef", "head chef"],
      "approvedJob": [],
      "startTime": "11/17/2017",
      "endTime": "11/17/2017",
      "cafeManagerId": "654f2caeaf932b1a7362331c"
    }

    const response = await api
      .post('/api/workslots/')
      .send(postData)
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).to.equal(201);
  });

  it('Cafe owner update workslot', async () => {
    const postData = {
      "pendingJob": ["chef", "head chef", "waiter"]
    }

    const response = await api
      .patch('/api/workslots/655597ef75e19d981be1ad1d')
      .send(postData)
      .set('Authorization', `Bearer ${validToken}`);


    expect(response.status).to.equal(200);
  });

  it('Cafe owner view all workslots', async () => {
    const response = await api
      .get('/api/workslots/')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).to.equal(200);
  });

  it('Cafe owner update account information', async () => {
    const postData = {
      username: "cafeowner new name"
    }

    const response = await api
      .patch('/api/users/655597ea75e19d981be1ac5f')
      .send(postData)
      .set('Authorization', `Bearer ${validToken}`);


    expect(response.status).to.equal(200);
  });

  it('Cafe owner delete workslot', async () => {
    const response = await api
      .delete('/api/workslots/655597ef75e19d981be1ad41')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).to.equal(200);
  });

  it('Cafe owner search for specified workslots', async () => {
    const response = await api
      .get('/api/workslots/search/?cafeManagerId=655597ed75e19d981be1acb9')
      .set('Authorization', `Bearer ${validToken}`);

    expect(response.status).to.equal(200);
  });


});
