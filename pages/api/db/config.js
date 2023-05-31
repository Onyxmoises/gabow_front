import {createPool} from "mysql2/promise";

const con=createPool({
    host:"localhost",
    user:"root",
    password:"Hal02012()",
    port:"3306",
    database:"Gabow"
});

export default con;