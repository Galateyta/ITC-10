var students = [
    {
        id:1,
        name: "Arman",
        surname: "Petrosyan",
        classid:"7a"
    },
    {
        id:2,
        name: "Armen",
        surname: "Petrosyan",
        classid:"8b"
    },
    {
        id:3,
        name: "Ani",
        surname: "Poghosyan",
        classid:"7a"
    }
]
var teachers = [
    {
        id:1,
        name: "Arman",
        surname: "Voskanyan",
        subject:"Matem"
    },
    {
        id:2,
        name: "Anahit",
        surname: "Kirakosyan",
        subject:"Fizika"
    },
    {
        id:3,
        name: "Anush",
        surname: "Grigoryan",
        subject:"Qimia"
    }
]
var classes = [{
    id:1,
    number:"7a",
    studCount:15

},
{
    id:2,
    number:"7b",
    studCount:17

},
{
    id:3,
    number:"8a",
    studCount:20

},
{
    id:4,
    number:"10a",
    studCount:18

}]
var subjects = [{
    id:1,
    name:"Fizika"
},
{
    id:2,
    name:"Qimia"
},
{
    id:3,
    name:"Matem"
}]
module.exports.subjects = subjects;
module.exports.students = students;
module.exports.teachers = teachers;
module.exports.classes = classes;