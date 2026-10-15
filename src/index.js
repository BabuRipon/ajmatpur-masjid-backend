import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

import pool from './config/db.js';
import userRoutes from './routes/user.route.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get('/health', async (req, res) =>{
    return res.status(200).json({message: 'ok'})
})
app.use('/api/v1', userRoutes);

app.use((err, req, res, next)=>{
    res.status(500).json({
        message: 'Internal server error',
    })
})

const initDB =async () => {
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name varchar(100) NOT NULL,
                mobile_no varchar(15) NOT NULL,
                email varchar(50),
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS foods(
                id SERIAL PRIMARY KEY,
                cycle_no INTEGER NOT NULL,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        console.log('Database initialized successfully.');
    }
    catch(error){
        console.log('error initDB: ',error);
    }
}

async function startServer(){
    try{
        await initDB();
        app.listen(process.env.PORT || 4000, ()=>{
            console.log('server is running on http://localhost:',process.env.PORT||4000);
        })
    }
    catch(error){
        console.log('some error on starting server: ',error)
        process.exit(1);
    }
}
startServer();
