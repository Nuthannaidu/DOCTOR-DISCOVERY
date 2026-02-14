const mysql=require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Siddu@1234",
  database: "doctor_app",
});

module.exports=pool.promise();