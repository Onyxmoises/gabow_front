import mysql from "mysql2";

const con=mysql.createPool({
    host:"mysql-129233-0.cloudclusters.net",
    user:"admin",
    password:"jafPWDyu",
    port:"19338",
    database:"gabow"
});

export default con;