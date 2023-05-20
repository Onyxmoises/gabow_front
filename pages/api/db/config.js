import mysql from "mysql2";

const con=mysql.createPool({
    host:"containers-us-west-15.railway.app",
    user:"root",
    password:"GROvdeqaZDpn4dc5IzSU",
    port:"5755",
    database:"railway"
});

export default con;