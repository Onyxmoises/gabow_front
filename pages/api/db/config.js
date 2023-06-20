import {createPool} from "mysql2/promise";

const con=createPool({
    host:"containers-us-west-15.railway.app",
    user:"root",
    password:"GROvdeqaZDpn4dc5IzSU",
    port:"5755",
    database:"railway"
});

export default con;