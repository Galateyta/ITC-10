const connection = require('../databases/mysql')

module.exports.getStudents = function (){

    return new Promise((resolve,reject)=>{
        connection.query('SELECT * from Students', function (error, results) {
            if (error) {
                reject(error);
                }else{
                resolve(results);
            }
          });
    })
    
} 

module.exports.insertUser = function (data){
   return new Promise((resolve,reject)=>{
       connection.query('Insert into Students set ?',data, function (error, results) {
           if (error) {
               reject(error);
               }else{
               resolve(results);
           }
         });
   })
}