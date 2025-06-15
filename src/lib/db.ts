

import pg from "pg";

export const dbConnection = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST
};



const { Pool } = pg
export const pool = new Pool(dbConnection);