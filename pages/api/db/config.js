import mysql from "mysql2";

const con=mysql.createPool({
    host:"containers-us-west-48.railway.app",
    user:"root",
    password:"57sT9iuBYDvTmZo7zNop",
    port:"6461",
    database:"railway"
});

export default con;