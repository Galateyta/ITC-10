const chai = require('chai');
const should = chai.should();
const server = require("../app");
const chaiHttp = require('chai-http');
const app = require('../routers/students')

chai.use(chaiHttp);

describe('Studends', () => {
    describe("GET /students", () => {
        it("should get all students record", (done) => {
            chai.request(server)
                .get('/students')
                .set('Authorization', 'ITC10')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    it('it should not POST a student beacuse name field', (done) => {
        const student = {
            "name": "ani",
            "surname": "Davtyan",
            "age": 14,
            "gender": "female",
            "parentsName": "Meline",
            "parentsSurname": "Davtyan",
            "parentsPhone": "374754515",
            "parentsAddress": "Chuxajyan 16/18"
        }
        chai.request(server)
            .post('/students')
            .set('Authorization', 'ITC10')
            .send(student)
            .end((err, res) => {
                res.body.should.be.a('array');
                done();
            });
    });

    it('it should not POST a student beacuse surname field', (done) => {
        const student = {
            "name": "Ani",
            "surname": "advtyan",
            "age": 14,
            "gender": "female",
            "parentsName": "Meline",
            "parentsSurname": "Davtyan",
            "parentsPhone": "374754515",
            "parentsAddress": "Chuxajyan 16/18"
        }
        chai.request(server)
            .post('/students')
            .set('Authorization', 'ITC10')
            .send(student)
            .end((err, res) => {
                res.body.should.be.a('array');
                done();
            });
    });

    describe('POST / student', () => {
        it('it should not POST a student beacuse age greather then 17', (done) => {
            const student = {
                "name": "Ani",
                "surname": "Davtyan",
                "age": 44,
                "gender": "female",
                "parentsName": "Meline",
                "parentsSurname": "Davtyan",
                "parentsPhone": "374754515",
                "parentsAddress": "Chuxajyan 16/18"
            }
            chai.request(server)
                .post('/students')
                .set('Authorization', 'ITC10')
                .send(student)
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should not POST a student beacuse age constter then 6', (done) => {
            const student = {
                "name": "Ani",
                "surname": "Davtyan",
                "age": 4,
                "gender": "female",
                "parentsName": "Meline",
                "parentsSurname": "Davtyan",
                "parentsPhone": "374754515",
                "parentsAddress": "Chuxajyan 16/18"
            }
            chai.request(server)
                .post('/students')
                .set('Authorization', 'ITC10')
                .send(student)
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should be POST a succesfully', (done) => {
            const student = {
                "name": "Ani",
                "surname": "Davtyan",
                "age": 14,
                "gender": "female",
                "parentsName": "Meline",
                "parentsSurname": "Davtyan",
                "parentsPhone": "374754515",
                "parentsAddress": "Chuxajyan 16/18"
            }
            chai.request(server)
                .post('/students')
                .set('Authorization', 'ITC10')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.response.should.have.property('subject').be.eql('fizika');
                    done();
                });
        });

    });
});