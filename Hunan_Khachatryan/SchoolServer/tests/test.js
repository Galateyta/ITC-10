const chaiHttp = require('chai-http');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const server = require('../app').app;

chai.use(chaiHttp);

 
  describe('/GET students', () => {
      it('it should GET all the students', (done) => {
        chai.request(server)
            .get('/students')
            .set('Authorization', 'ITC10')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.be.a('array');
              done();
            });
       
      });
  });

  describe('/POST students ', () => {
    it('it should add  the students', (done) => {
      const student = {
        Name:"Axas",
        Surename:"Manukyan",
        Age:6,
        Gender:"male",
        classID:1
      }
      chai.request(server)
          .post('/students')
          .set('Authorization', 'ITC10')
          .send(student)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.be.a('object');
            done();
          });
     
    });
});
describe('/POST students', () => {
  it('it should dont add  the students', (done) => {
    const student = {
      Name:"Axas",
      Surname:"Manukyan",
      Age:40,
      Gender:"male",
      classID:1
     
    }
    chai.request(server)
        .post('/students')
        .set('Authorization', 'ITC10')
        .send(student)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.be.a('object');
          done();
        });
   
  });
});


describe('/POST students admit ', () => {
    it('it should admit  the students', (done) => {
      const student = {
        Name:"Axas",
        Surename:"Manukyan",
        Age:6,
        Gender:"male",
        pName:"Artak",
        pSurename:"Vardanyan",
        pPhone:98457896,
        pEmail:"a_k@mail.ru"
      }
      chai.request(server)
          .post('/students/admit')
          .set('Authorization', 'ITC10')
          .send(student)
          .end((err, res) => {
            console.log(res.body)
            res.should.have.status(200);
            res.body.should.have.be.a('array');
            
            done();
          });
     
    });
});
describe('/POST students admit ', () => {
    it('it should not admit  the students', (done) => {
      const student = {
        Name:"Axas",
        Surename:"Manukyan",
        Age:5,
        Gender:"male",
        pName:"Artak",
        pSurename:"Vardanyan",
        pPhone:98457896,
        pEmail:"a_k@mail.ru"
      }
      chai.request(server)
          .post('/students/admit')
          .set('Authorization', 'ITC10')
          .send(student)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.be.a('object');
            done();
          });
     
    });
});

describe('/POST students admit ', () => {
    it('it should have errors property', (done) => {
      const student = {
        Name:"Axas",
        Surename:"Manukyan",
        Age:19,
        Gender:"male",
        pName:"Artak",
        pSurename:"Vardanyan",
        pPhone:98457896,
        pEmail:"a_k@mail.ru"
      }
      chai.request(server)
          .post('/students/admit')
          .set('Authorization', 'ITC10')
          .send(student)
          .end((err, res) => {
              console.log(res.body);
            res.should.have.status(404);
            res.body.should.have.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.a('array');
            res.body.errors[0].param.should.equal('Age');


            done();
          });
     
    });
});

describe('/POST students admit ', () => {
    it('it should have error Gender', (done) => {
      const student = {
        Name:"Axas",
        Surename:"Manukyan",
        Age:7,
        Gender:"ale",
        pName:"Artak",
        pSurename:"Vardanyan",
        pPhone:98457896,
        pEmail:"a_k@mail.ru"
      }
      chai.request(server)
          .post('/students/admit')
          .set('Authorization', 'ITC10')
          .send(student)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.a('array');
            res.body.errors[0].param.should.equal('Gender');
            done();
          });
     
    });
});

describe('/POST students admit ', () => {
    it('it should ', (done) => {
      const student = {
        Name:"Axas",
        Surename:"Manukyan",
        Age:7,
        Gender:"ale",
        pName:"Artak",
        pSurename:"Vardanyan",
        pPhone:98457896,
        pEmail:"a_k@mail.ru"
      }
      chai.request(server)
          .post('/students/admit')
          .set('Authorization', 'ITC10')
          .send(student)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.a('array');
            res.body.errors[0].param.should.equal('Gender');
            done();
          });
     
    });
});

