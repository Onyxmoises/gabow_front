import mysql from "mysql2";

const con=mysql.createPool({
    host:"192.168.154.128",
    user:"root",
    password:"Hal02012()",
    port:"3306",
    database:"Gabow"
});

export default con;