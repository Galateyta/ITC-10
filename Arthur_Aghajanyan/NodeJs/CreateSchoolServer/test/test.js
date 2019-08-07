var assert = require('assert');
var http = require('http');
var dbData = require("../schoolDb");

/*
Object.compare = function (obj1, obj2) {
    for (var p in obj1) {
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

        switch (typeof (obj1[p])) {
            case 'object':
                if (!Object.compare(obj1[p], obj2[p])) return false;
                break;
            case 'function':
                if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false;
                break;
            default:
                if (obj1[p] != obj2[p]) return false;
        }
    }

    for (var p in obj2) {
        if (typeof (obj1[p]) == 'undefined') return false;
    }
    return true;
};
*/

describe('/', function () {
    it('should return 200', function (done) {
        http.get('http://localhost:9999/students', function (res) {
                assert.equal(200, res.statusCode);
                done();
                });
    });


    it('Check student info with id 1', function (done) {
        http.get('http://localhost:9999/students/1', function (res) {
                var data;
                var item = dbData.students.find(elem => elem.id == 1);

                res.on('data', function (res) {
                    data = JSON.parse(res);
                });
                res.on('end', function () {
                    //assert.equal(Object.compare(item, data), true);
                    assert.equal(item.id, data.id, "id not equal");
                    assert.equal(item.name, data.name, "name not equal");
                    assert.equal(item.surname, data.surname, "surname not equal");
                    assert.equal(item.age, data.age,"age not equal");
                    assert.equal(item.email, data.email,"data not equal");
                    assert.equal(item.gender, data.gender,"gender not equal");
                    assert.equal(item.autoNumber, data.autoNumber,"autoNumber not equal");
                    done();
                });
                });
    });

    it('Check students all info with', function (done) {
        http.get('http://localhost:9999/students', function (res) {
                var data;

                res.on('data', function (res) {
                    data = JSON.parse(res);
                });
                res.on('end', function () {
                    assert.equal(dbData.students.length, data.length, "length not equal");
                    for(let i = 0; i < dbData.students.length; i++){
                        //assert.equal(Object.compare(item, data), true);
                        assert.equal(dbData.students[i].id, data[i].id, "id not equal");
                        assert.equal(dbData.students[i].name, data[i].name, "name not equal");
                        assert.equal(dbData.students[i].surname, data[i].surname, "surname not equal");
                        assert.equal(dbData.students[i].age, data[i].age,"age not equal");
                        assert.equal(dbData.students[i].email, data[i].email,"data not equal");
                        assert.equal(dbData.students[i].gender, data[i].gender,"gender not equal");
                        assert.equal(dbData.students[i].autoNumber, data[i].autoNumber,"autoNumber not equal");
                    }
                    done();
                });
                });
    });

});


