import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();

// import pool from './config/db.js';
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

// async function startServer(){
//     try{
//         app.listen(process.env.PORT || 4000, ()=>{
//             console.log('server is running on http://localhost:',process.env.PORT||4000);
//         })
//     }
//     catch(error){
//         console.log('some error on starting server: ',error)
//         process.exit(1);
//     }
// }
// startServer();

export default app;

