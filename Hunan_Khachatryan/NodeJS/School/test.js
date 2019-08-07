//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Подключаем dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');
let should = chai.should();

chai.use(chaiHttp);

 
  describe('/GET students', () => {
      it('it should GET all the students', (done) => {
        chai.request(server)
            .get('/students')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(3);
              done();
            });
      });
  });

