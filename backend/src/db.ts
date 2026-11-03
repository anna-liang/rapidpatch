import { Pool } from 'pg';

export const pool = new Pool({ connectionString: process.env.ENV === 'production' ? process.env.DATABASE_PROD_URL : process.env.DATABASE_LOCAL_URL });

pool.connect()
    .then((client) => {
        console.log('Connected successfully!');
    })
    .catch(err => {
        console.error('Connection failed:', err.message);
    });