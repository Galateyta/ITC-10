const connection = require('../databases/mysql')

function getClasses(classNumber){

    return new Promise ((resolve,reject) => {
        connection.query('select * from (select Classes.id, Classes.Name,count(Students.Name) as count from Students inner join Classes on  Students.classID=Classes.id group by Students.classID) As Class where Name=' + classNumber , function (error, results) {
            if (error) { 
                reject(error);
                }else{
                                  
                resolve(results);
            }
          });

    });
}
function getClassId(className){
    return new Promise ((resolve,reject) => {
        connection.query(" select id  from Classes where Name='" + className +"'" , function (error, results) {
            if (error) { 
                reject(error);
                }else{
                resolve(results);
            }
          });

    });
}
function getClassSubjects(className){
    return new Promise ((resolve,reject) => {
        connection.query(" select * from ClassSubject where Class=" + className, function (error, results) {
            if (error) { 
                reject(error);
                }else{

                    resolve(results);
            }
          });

    });
}
function addClass(className){
    return new Promise ((resolve,reject) => {
        connection.query(" insert into Classes (schoolID,Name) values (1,'" + className +"')" , function (error, results) {
            if (error) { 
                reject(error);
                }else{
                resolve(results);
            }
          });

    });
}
function admitStudent(data){
    return new Promise ((resolve,reject) => {
        connection.query('INSERT INTO Students SET ?',data, function (error, results) {
            if (error) { 
                reject(error);
                }else{
                    resolve(results);
            }
          });

    });
}
function admitParent(data){
    return new Promise ((resolve,reject) => {
        connection.query('INSERT INTO Parents SET ?',data, function (error, results) {
            if (error) { 
                reject(error);
                }else{
                    resolve(results);
            }
          });

    });
}
function admitDatas(data){
    return new Promise ((resolve,reject) => {
        const age = data.Age;
        let classNumber;
        let className;
        let childData = {};
        childData.Name = data.Name;
        childData.Surename = data.Surename;
        childData.Age = data.Age;
        childData.Gender = data.Gender;    

        let parentData = {};
        parentData.Name = data.pName;
        parentData.Surename = data.pSurename;
        parentData.Phone = data.pPhone;
        parentData.Email = data.pEmail;

        switch(age){
            case 6: classNumber = 1;
                break;    
            case 7: classNumber = 2;
                break;
            case 8: classNumber = 3;
                break;
            case 9: classNumber = 4;
                break;    
            case 10: classNumber = 5;
                break;
            case 11: classNumber = 6;
                break;
            case 12: classNumber = 7;
                break;    
            case 13: classNumber = 8;
                break;
            case 14: classNumber = 9;
                break;
            case 15: classNumber = 10;
                break;    
            case 16: classNumber = 11;
                break;
            case 17: classNumber = 12;
                break;
            default :
                break;
            
        }

        getClasses(classNumber)
        .then(result=>{

            if (0 === result.length){

                className = classNumber + 'a';
                addClass(className)
                .then(result=>{
                    console.log("newclass a", result);
                
                })
                .catch(error=>{
                    reject(error);
                })
                getClassId(className)
                .then(result=>{
                    childData.classID=result[0].id;
                    admitStudent(childData)
                        .then( result=>{ 
                        console.log(result);
            
                        })
                        .catch(error=>{
                        console.log(error);
                        })
                    })
                .catch(error=>{
                    console.log(error);
                })
        
            }else{
                let count = result[0].count;
                if (10 >  count ){          
                    className = classNumber + 'a';
                }else{
                    className = classNumber + 'b';                    
                    if(result[1]){
                        if(10 <= result[1].count){
                            className = classNumber + 'c';
                            if(!result[2]){
                                addClass(className)
                                .then(result=>{
                                    console.log("newclass c", result);
                                
                                })
                                .catch(error=>{
                                    reject(error);
                                })

                            }
                        }

                        
                    }else {
                        addClass(className)
                        .then(result=>{
                            console.log("newclass b", result);
                        
                        })
                        .catch(error=>{
                            console.log(error);
                        })
                    }
                    
                }
                    
                getClassId(className)
                .then(result=>{
                    const classID = result[0].id;
                    childData.classID=classID;
                
                    admitStudent(childData)
                    .then( result=>{ 
                        parentData.studentID = result.insertId;
                        admitParent(parentData)
                        .then(result=>{

                            getClassSubjects(classID)
                            .then(result=>{
                                 resolve(result);
                            })
                            .catch(error=>{
                                reject(error);
                            })
                        })
                        .catch(error=>{
                            reject(error);
                        })
        
                    })
                    .catch(error=>{
                        reject(error);
                    })
                })
                .catch(error=>{
                    reject(error);
                })
            }      
        })
        .catch(error=>{ 
            reject(error);
        })
    });
}
module.exports.studentAdmit = function (data) {
    return new Promise((resolve,reject)=>{
        admitDatas(data)
        .then(result=>{
            resolve(result);
        })
        .catch(error=>{
            reject(error);
        })

    })
    
    
    
};