process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const supertest = require("supertest");
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();
chai.use(chaiHttp);


describe("Students", () => {

    describe("GET /students", () => {
        // Test to get all students record
        it("should get all students record", (done) => {
             chai.request(app)
                 .get('/students')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('array');
                     done();
                  });
         });

       });

       describe("POST /", () => {
           it('it should not POST a students without name field', (done) => {
             const students = {
                 name: "asdf",
                 surname: "Davtyan",
                 age: 15,
                 classId : 7,
                 email : "davtyan.ani15@gmail.com",
                 gender : "male",
             }
             chai.request(app)
                 .post('/students')
                 .send(students)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('errors');
                     res.body.errors.should.have.property('name');
                     res.body.errors.name.should.have.property('kind').eql('required');
                   done();
                 });
           });

           it('it should not POST a student without age  greater 30 field', (done) => {
             const students = {
                 name: "Aasdf",
                 surname: "Davtyan",
                 age: 44,
                 classId : 7,
                 email : "davtyan.ani15@gmail.com",
                 gender : "male",
             }
             chai.request(app)
                 .post('/students')
                 .send(students)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('errors');
                     res.body.errors.should.have.property('age');
                     res.body.errors.name.should.have.property('kind').eql('required');
                   done();
                 });
           });

           it('it should not POST a students without age constter 6 field', (done) => {
             const students = {
                 name: "Aasdf",
                 surname: "Davtyan",
                 age: 4,
                 classId : 7,
                 email : "davtyan.ani15@gmail.com",
                 gender : "male",
             }
             chai.request(app)
                 .post('/students')
                 .send(students)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('errors');
                     res.body.errors.should.have.property('age');
                     res.body.errors.name.should.have.property('kind').eql('required');
                   done();
                 });
           });

           it('it should not POST a students without surname field', (done) => {
             const students = {
                 name: "Aasdf",
                 surname: "ssDavtyan",
                 age: 15,
                 classId : 7,
                 email : "davtyan.ani15@gmail.com",
                 gender : "male",
             }
             chai.request(app)
                 .post('/students')
                 .send(students)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('errors');
                     res.body.errors.should.have.property('surname');
                     res.body.errors.name.should.have.property('kind').eql('required');
                   done();
                 });
           });

           it('it should not POST a students without email field', (done) => {
             const students = {
                 name: "Sasdf",
                 surname: "Davtyan",
                 age: 15,
                 classId : 7,
                 email : "davtyan.ani15mail.com",
                 gender : "male",
             }
             chai.request(app)
                 .post('/students')
                 .send(students)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('errors');
                     res.body.errors.should.have.property('email');
                     res.body.errors.name.should.have.property('kind').eql('required');
                   done();
                 });
           });

           it('it should not POST a students without gender field', (done) => {
             const students = {
                 name: "Aasdf",
                 surname: "Davtyan",
                 age: 15,
                 classId : 7,
                 email : "davtyan.ani15@gmail.com",
                 gender : "aaa",
             }
             chai.request(app)
                 .post('/students')
                 .send(students)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('errors');
                     res.body.errors.should.have.property('gender');
                     res.body.errors.name.should.have.property('kind').eql('required');
                   done();
                 });
           });

           it('it should  POST a student  ', (done) => {
             const students = {
                 name: "Sdddddddddddddddd",
                 surname: "Allllllllllllllllllllllllllllllllllll",
                 age: "15",
                 classId : "4",
             }
             chai.request(app)
                 .post('/students')
                 .end((err, res) => {
                     res.should.have.status(200);
                    res.body.should.be.a('object');
                   done();
                 });
           });

        });
     });
