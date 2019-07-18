const server = require("../index");
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
describe('Studends', () => {
    describe("GET /", () => {
        it("should get all students record", (done) => {
            chai.request(server)
                .get('/students')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
    describe('POST / student', () => {
        it('it should not POST a student beacuse age greather then 30', (done) => {
            const student = {
                "firstname": "Vazgen",
                "lastname": "Sargsyan",
                "age": 40,
                "email": "vazgen@gmail.com",
                "gender": "male",
                "carNumber": "09GG001"
            }
            chai.request(server)
                .post('/students')
                .send(student)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    done();
                });
        });
        it('it should be POST a succesfully', (done) => {
            const student = {
                "firstname": "Vazgen",
                "lastname": "Sargsyan",
                "age": 25,
                "email": "vazgen@gmail.com",
                "gender": "male",
                "carNumber": "09GG001"
            }
            chai.request(server)
                .post('/students')
                .send(student)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });

        });

    });
});