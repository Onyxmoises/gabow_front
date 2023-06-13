import {createPool} from "mysql2/promise";

const con=createPool({
    host:"mysql-130297-0.cloudclusters.net",
    user:"admin",
    password:"CfHCny4B",
    port:"19388",
    database:"gabow"
});

export default con;