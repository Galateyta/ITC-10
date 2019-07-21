process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.use(chaiHttp);

describe('Students', () => {
  describe('GET /', () => {
    it('Should return an array with 200 status code.', (done) => {
      chai
        .request(server)
        .get('/students')
        .set('Authorization', 'ITC10')
        .end((err, res) => {
          res
            .should
            .have
            .status(200);
          res
            .body
            .should
            .be
            .a('array');
          done();
        });
    });
  });
});