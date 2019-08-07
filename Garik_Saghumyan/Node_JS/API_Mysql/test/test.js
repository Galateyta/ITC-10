const server = require("../app");
const app = require('../routers/students')
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);
describe('Studends', () => {
    describe("GET /", () => {
        it("should get all students record", (done) => {
            chai.request(server)
                .get('/students')
                .set('Authorization', 'ITC10')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    console.log(res.body);
                    done();
                });
        });
    });
    describe('POST / student', () => {
        it('it should not POST a student beacuse age greather then 17', (done) => {
            const student = {
                "name": "Vazgen",
                "surname": "Sargsyan",
                "age": 20,
                "gender": "male",
                "parentsName": "Vazgenicnox",
                "parentsSurname": "Vazgenicmoxyan",
                "parentsPhone": "05555555",
                "parentsAddress": "iranc tun"
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
                "name": "Vazgen",
                "surname": "Sargsyan",
                "age": 7,
                "gender": "male",
                "parentsName": "Vazgenicnox",
                "parentsSurname": "Vazgenicmoxyan",
                "parentsPhone": "05555555",
                "parentsAddress": "iranc tun"
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